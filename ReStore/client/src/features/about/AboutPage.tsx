import { Button, ButtonGroup, Typography } from "@mui/material";
import agent from "../../app/api/agent";

const AboutPage = () => {
  return (
    <>
      <Typography gutterBottom variant={"h2"}>
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          onClick={() =>
            agent.TestErrors.get400Error().catch((error) => console.log(error))
          }
          variant={"contained"}>
          Test 400 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get401Error().catch((error) => console.log(error))
          }
          variant={"contained"}>
          Test 401 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get404Error().catch((error) => console.log(error))
          }
          variant={"contained"}>
          Test 404 error
        </Button>
        <Button
          onClick={() =>
            agent.TestErrors.get500Error().catch((error) => console.log(error))
          }
          variant={"contained"}>
          Test 500 error
        </Button>
      </ButtonGroup>
    </>
  );
};

export default AboutPage;
