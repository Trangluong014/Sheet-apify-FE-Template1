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
import { getPastVisitors, changeSingleVisitor } from "../../features/visitors/visitorSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function VisitHistoryTab() {
  const { website } = useSelector(state => state.website);
  const { pastVisitors: visitors, isLoading } = useSelector(state => state.visitor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPastVisitors())
  }, [website]);
  
  return <Stack spacing={2} direction="column">
    {visitors && !isLoading
      ? visitors.map(visitor => <Card key={visitor.rowIndex}>
        <CardHeader subheader={`${new Date(visitor.starttime).toLocaleTimeString()} - ${new Date(visitor.endtime).toLocaleTimeString()}`} />
        <CardContent>
          <Typography variant="h6">{visitor.firstname} {visitor.lastname}</Typography>
          <Typography variant="body1">{visitor.email}</Typography>
          <Typography variant="body1">{visitor.phone}</Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <div></div>
          <div>
            <IconButton onClick={() => dispatch(changeSingleVisitor({
              rowIndex: visitor.rowIndex,
              data: { 
                deleted: 1,
              }
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

export default VisitHistoryTab