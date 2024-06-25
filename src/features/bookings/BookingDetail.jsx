import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking, useFetchBooking } from "./bookings-api-client";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useCheckout } from "../check-in-out/checkinout-api-client";
import { useNavigate } from "react-router";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const { booking, isLoading } = useFetchBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button
          disabled={isDeleting}
          onClick={() =>
            deleteBooking(bookingId, {
              onSettled: () => {
                navigate(-1);
              },
            })
          }
        >
          Delete Booking
        </Button>

        {status === "checked-in" && (
          <CheckoutButton
            bookingId={bookingId}
            onHandleCheckout={checkout}
            onDisabled={isCheckingOut}
          >
            Checkout
          </CheckoutButton>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
