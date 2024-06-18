import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [newCabin, setNewCabin] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Test</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setNewCabin((prevCabin) => !prevCabin)}>
          Add new cabin
        </Button>
        {newCabin && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
