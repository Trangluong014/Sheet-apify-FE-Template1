import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { getUpcomingVisitors, changeSingleVisitor } from "../../features/visitors/visitorSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import addHours from "date-fns/addHours";

function ArrivingNextTab() {
  const { website } = useSelector(state => state.website);
  const { visitors, isLoading } = useSelector(state => state.visitor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpcomingVisitors())
  }, [website]);

  return <Stack spacing={2} direction="column">
    {visitors && !isLoading
      ? visitors.map(visitor => <Card key={visitor.rowIndex}>
        <CardHeader subheader={new Date(visitor.starttime).toLocaleTimeString()} />
        <CardContent>
          <Typography variant="h6">{visitor.firstname} {visitor.lastname}</Typography>
          <Typography variant="body1">{visitor.email}</Typography>
          <Typography variant="body1">{visitor.phone}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={() => {
            const currentTime = new Date().getTime();
            dispatch(changeSingleVisitor({
              rowIndex: visitor.rowIndex,
              data: {
                starttime: currentTime,
                endtime: visitor.endtime <= currentTime ? addHours(currentTime, 1) : visitor.endtime,
                visited: 1,
              }
            }))
          }}>
            Check-In
          </Button>
          <div>
            <IconButton onClick={() => dispatch(changeSingleVisitor({
              rowIndex: visitor.rowIndex,
              data: { deleted: 1, }
            }))}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>)
      : <LoadingScreen />
    }
  </Stack>
}

export default ArrivingNextTab