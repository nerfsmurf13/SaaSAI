import React from "react";
import {
  Box,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
  Collapse,
  Alert,
  TextField,
  Button,
  Card,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { red } from "@mui/material/colors";
import axios from "axios";

const TestBuilderScreen = () => {
  const color = red[500];
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [questionNo, setQuestionNo] = useState(5);
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const [summary, setSummary] = useState("");

  const buildTestHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/openai/testbuilder", { subject, type, questionNo, level });
      console.log(data);
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      setSummary(jsonData);
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Box
      width={isNotMobile ? "50%" : "90%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={buildTestHandler}>
        <Typography variant="h3" mb={2}>
          Test Builder
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box width="100%">
            <TextField
              mb={2}
              placeholder="'George Orwell's 1984', 'The Periodic Table','History of Houston, Texas'"
              label="Test Subject"
              multiline
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="">
                <em>Choose a Test Type</em>
              </MenuItem>
              <MenuItem value={"multiplechoice"}>Multiple Choice</MenuItem>
              <MenuItem value={"shortanswer"}>Short Answer</MenuItem>
              <MenuItem value={"allthatapply"}>All That Apply</MenuItem>
            </Select>
            <TextField
              placeholder={5}
              fullWidth
              type="number"
              value={questionNo}
              onChange={(e) => setQuestionNo(e.target.value)}
            />
            <TextField
              multiline="true"
              placeholder="Test Level"
              fullWidth
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </Box>
          <Button disableElevation variant="contained" type="submit" sx={{ color: "white" }}>
            Summarize
          </Button>
        </Stack>
      </form>
      {summary ? (
        summary.questions.map((item) => (
          <Card
            sx={{
              mt: 2,
              p: 2,
              border: 1,
              boxShadow: 0,
              borderColor: "neutral.medium",
              borderRadius: 2,
              // height: "500px",
              bgcolor: "background.default",
            }}
          >
            <Typography>
              <div>{item.question}</div>
              <ul>
                {item.options.map((question, index) => (
                  <li className={index === item.answer ? "red" : ""}>{question}</li>
                ))}
              </ul>

              <div>{item.answer}</div>
            </Typography>
          </Card>
        ))
      ) : (
        <Card
          sx={{
            mt: 4,
            p: 2,
            border: 1,
            boxShadow: 0,
            borderColor: "neutral.medium",
            borderRadius: 2,
            height: "500px",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h3"
            color="neutral.main"
            sx={{ textAlign: "center", verticalAlign: "middle", lineHeight: "450px" }}
          >
            Summary will appear here
          </Typography>
        </Card>
      )}
      <Typography mt={2}>
        Not the tool you were looking for? <Link href="/">Go back</Link>
      </Typography>
    </Box>
  );
};

export default TestBuilderScreen;
