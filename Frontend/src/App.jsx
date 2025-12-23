import { Button, Box } from "@chakra-ui/react";
import TestMap from "./tests/TestMap";
const App = () => {
  return (
    <Box bgColor={"red.200"}>
      <Button bgColor={"blue.500"}>this is a sample mark </Button>
      <TestMap />
    </Box>
  );
};

export default App;
