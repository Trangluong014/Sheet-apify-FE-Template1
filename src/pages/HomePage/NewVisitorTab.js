import { useCallback, useMemo } from "react";

import {
  Stack,
  TextField,
  Button,
} from "@mui/material";

import { 
  DateTimePicker 
} from '@mui/x-date-pickers/DateTimePicker';

import { useForm, Controller } from "react-hook-form";
import LoadingScreen from "../../components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { FormProvider, FTextField } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewVisitor } from "../../features/visitors/visitorSlice";
import * as Yup from "yup";

const VisitorSchema = Yup.object().shape({
  firstname: Yup.string().trim().required("First name is required"),
  lastname: Yup.string().trim().required("Last name is required"),
  phone: Yup.string().trim(),
  starttime: Yup.date().required("Start time is required"),
  endtime: Yup.date().required("End time is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function NewVisitorTab() {
  const { visitors, isLoading } = useSelector(state => state.visitor);
  const dispatch = useDispatch();

  const currentDate = useMemo(() => new Date(), []);
  const defaultValues = {
    firstname: "",
    lastname: "",
    phone: "",
    starttime: currentDate,
    endtime: currentDate,
    email: "",
  }
  const methods = useForm({
    resolver: yupResolver(VisitorSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(async ({starttime, endtime, ...data}) => {
    const visitor = {
      ...defaultValues,
      starttime: starttime.getTime(),
      endtime: endtime.getTime(),
      ...data,
    }
    dispatch(addNewVisitor(visitor));
    reset();
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} direction="column">
        <FTextField 
          required
          name="firstname" 
          label="First name"
          variant="filled"
        />

        <FTextField 
          required
          name="lastname" 
          label="Last name"
          variant="filled"
        />

        <FTextField
          required
          name="email"
          label="Email address"
          variant="filled"
        />

        <FTextField
          name="phone"
          label="Phone number"
          variant="filled"
        />

        <Controller
          name="starttime"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="Start Time"
              {...field}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />

        <Controller
          name="endtime"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimePicker
              label="End Time"
              {...field}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          Add Visitor
        </Button>
      </Stack>
    </FormProvider>
  )
}

export default NewVisitorTab;