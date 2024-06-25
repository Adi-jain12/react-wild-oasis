import Button from "../../ui/Button";

function CheckoutButton({ bookingId, children, onHandleCheckout, isDisabled }) {
  return (
    <Button
      disabled={isDisabled}
      onClick={() => onHandleCheckout(bookingId)}
      variation="primary"
      size="small"
    >
      {children}
    </Button>
  );
}

export default CheckoutButton;
