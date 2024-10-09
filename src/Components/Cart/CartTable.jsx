import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MdDelete } from "react-icons/md";

export default function CartTable({
  cartItems,
  handleIncrementItem,
  handleDecrementItem,
  handleProduct,
  handleRemoveCartItem,
}) {
  return (
    <Table
      aria-label="simple table"
      className="!w-full lg:!w-9/12 !hidden md:!table"
    >
      <TableHead>
        <TableRow className="!hidden md:!table-row">
          <TableCell align="left">Product</TableCell>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell align="center">Unit Price</TableCell>
          <TableCell align="center">Total</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell>
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="w-12 md:w-20 h-12 md:h-20 object-cover cursor-pointer rounded-xl"
                onClick={() =>
                  handleProduct(item.title, item.id, item.category)
                }
              />
            </TableCell>

            <TableCell align="center" className="!text-base">
              {item.title}
            </TableCell>

            <TableCell align="right">
              <div className="mt-1 flex items-center justify-center gap-2">
                <button
                  className="border border-black/40  px-4  rounded-lg"
                  onClick={
                    item.qty > 1
                      ? () => handleDecrementItem(item.id)
                      : () => handleRemoveCartItem(item.id)
                  }
                >
                  -
                </button>
                {item.qty}
                <button
                  className="border border-black/40  px-4 rounded-lg"
                  onClick={() => handleIncrementItem(item.id)}
                >
                  +
                </button>
              </div>
            </TableCell>
            <TableCell align="center" className="xl:!text-base">
              Rs. {(item.price * 84).toLocaleString("en-IN")}
            </TableCell>

            <TableCell align="center" className=" xl !text-base !font-semibold">
              Rs. {(item.qty * item.price * 84).toLocaleString("en-IN")}
            </TableCell>

            <TableCell align="center">
              <button
                className="p-1 rounded-lg "
                onClick={() => handleRemoveCartItem(item.id)}
              >
                <MdDelete className="text-2xl" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
