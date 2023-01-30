import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { object } from "yup";
import { array } from "yup/lib/locale";
import { Row } from "react-bootstrap";

const OrderPanel = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const [orders, setOrders] = useState([]);
  const [shippingDate, setshippingDate] = useState();
  const [deliveryDate, setdeliveryDate] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

 const handleUpdate = () => {  
  
 handleClose();


  }
  useEffect(() => {
    axios(`${URL}/api/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleDelete = (id) => {
  
    let check = confirm("are you sure???");
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    check &&
      axios
        .delete(`${URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) =>
         setOrders(res.data));
  };

  return (
    <>
      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">OrderId</TableCell>
                <TableCell align="center">UserId</TableCell>
                <TableCell align="center">PaymentMethod</TableCell>
                <TableCell align="center">isPaid</TableCell>
                <TableCell align="center">ShippingDate</TableCell>
                <TableCell align="center">TotalPrice</TableCell>
                <TableCell align="center">isDelivered</TableCell>
                <TableCell align="center">DeliveryDate</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell align="center">{order._id}</TableCell>
                  <TableCell align="center">{order.user._id}</TableCell>
                  <TableCell align="center">{order.paymentMethod}</TableCell>
                  <TableCell align="center">
                    {order.isPaid ? (
                      <CheckIcon sx={{ color: "green" }} />
                    ) : (
                      <CloseIcon sx={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.shippingDate ? order.shippingDate : "pending"}
                  </TableCell>
                  <TableCell align="center">{order.totalPrice}</TableCell>
                  <TableCell align="center">
                    {order.isDelivered ? (
                      <CheckIcon sx={{ color: "lightgreen" }} />
                    ) : (
                      <CloseIcon sx={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.deliveryDate ? order.deliveryDate : "pending"}
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup size="small">
                      {/* <Button onClick={handleOpen}  >
                        <EditIcon/>
                      </Button> */}

                      <Button onClick={() => handleDelete(order._id)}>
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
     
  
     <Paper sx={style}>
       <Stack spacing={3} >
         <Box >
           <label>shippingDate: </label>
           <TextField
           
             fullWidth
             value={shippingDate}
             variant="standard"
             onChange={(e) => setshippingDate(e.target.value)}
           />
         </Box>
         <Box>
           <label>deliveryDate: </label>
           <TextField
             fullWidth
             value={deliveryDate}
             variant="standard"
             onChange={(e) => setdeliveryDate(e.target.value)}
           />
         </Box>
          
         <Button variant="contained" onClick={handleUpdate}>
           UPDATE
         </Button>
       </Stack>
     </Paper>
      
   </Modal>

      
        

   

    </>
  );
};

export default OrderPanel;
