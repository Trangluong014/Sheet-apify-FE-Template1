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
import EmptyScreen from "../../components/EmptyScreen"
import addHours from "date-fns/addHours";
import { red } from '@mui/material/colors';

function ArrivingNextTab() {
  const { website } = useSelector(state => state.website);
  const { visitors, isLoading } = useSelector(state => state.visitor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUpcomingVisitors())
  }, [website]);

  return <Stack spacing={2} direction="column">
    {visitors && !isLoading
      ? visitors.length === 0 
      ? <EmptyScreen />
      :visitors.map(visitor => <Card key={visitor.rowIndex}>
        <CardHeader subheader={new Date(visitor.starttime).toLocaleTimeString()} />
        <CardContent>
          <Typography variant="h6">{visitor.firstname} {visitor.lastname}</Typography>
          {visitor.starttime < new Date().getTime() && <Typography variant="body1" color={red[800]}>Arriving Late</Typography>}
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