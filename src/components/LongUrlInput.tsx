import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { InputGroup, Button, Form, Container, Row } from "react-bootstrap";
import "./LongUrlInput.css";

interface LongUrlInputProps {
  onUrlSubmit: (url: string) => void;
}

const LongUrlInput: React.FC<LongUrlInputProps> = ({ onUrlSubmit }) => {
  let [url, setUrl] = React.useState("");

  const [validator, setValidator] = React.useState(
    new SimpleReactValidator({
      autoForceUpdate: this,
      element: (message: string, className: string) => (
        <div className={className}>{message}</div>
      ),
    })
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add "http://" or "https://" to the input if it doesn't contain it
    let modifiedUrl = url;
    if (
      !modifiedUrl.startsWith("http://") &&
      !modifiedUrl.startsWith("https://")
    ) {
      modifiedUrl = `http://${modifiedUrl}`;
    }

    // Add a validation rule for the url field
    validator.message("url", modifiedUrl, "required|url");

    if (validator.fieldValid("url")) {
      setUrl(modifiedUrl);
      onUrlSubmit(modifiedUrl);
    } else {
      validator.showMessages();
      setValidator(validator);
    }
    // Reset the value of url to an empty string
    setUrl('');
  };

  return (
    <Container>
      <Row>
        <div className="main-input">
          <form onSubmit={handleSubmit}>
            <InputGroup size="lg">
              <Form.Control
                placeholder="Paste your long URL"
                aria-label="Paste your long URL"
                type="text"
                value={url}
                onChange={(event) => {
                  setUrl(event.target.value);
                  validator.showMessageFor("url");
                }}
              />
              <Button className="sharpn-btn" type="submit">
                Sharpn it!
              </Button>
            </InputGroup>
            {/* {validator.message("url", url, "required|url")} */}
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default LongUrlInput;
