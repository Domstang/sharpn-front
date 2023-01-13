import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Sharpn } from "../../store/modules/shortener";
import "./UserUrlsList.css";
import { Container, Row, Col, Card, Stack, Badge, Button } from "react-bootstrap";
import { MdOutlineContentCopy } from 'react-icons/md';

type UserUrlsListProps = {
  userUrls: Sharpn[];
  onUrlSubmit: (url: string) => void;
  setUserUrls: Dispatch<SetStateAction<Sharpn[]>>;
};

function UserUrlsList(props: UserUrlsListProps) {
  const [urls, setUrls] = useState(props.userUrls);
  const faviconUrl: String = "https://www.google.com/s2/favicons?domain=";
  const faviconSize: String = "&sz=32";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrls(props.userUrls);
  }, [props.userUrls]);

  function truncate(str: String) {
    return str.length > 70 ? str.substring(0, 67) + "..." : str;
  }

 /*  function copyToClipboard(arg: string) {
    navigator.clipboard.writeText(arg)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000);
  } */

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col>
          <div className="main-col">
            {urls.map((url, index) => (
              <Card className="mb-3">
                <div key={index}>
                  <Card.Header>
                    <Row>
                      <Stack direction="horizontal" gap={3}>
                        <div>
                          <img
                            src={`${faviconUrl}${url.longUrl as string}${faviconSize}`}
                            alt="fav"
                          ></img>
                        </div>
                        <div>
                          <a className="long-link" href={`${url.longUrl}`}>
                            {truncate(url.longUrl)}
                          </a>
                        </div>
                        <div className="ms-auto">
                          <Badge className="badge">{url.creationDate}</Badge>
                        </div>
                      </Stack>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                    <Stack direction="horizontal" gap={3}>
                      <div>
                      <Button /* onClick={() => copyToClipboard(url.shortUrl)} */>
                        <MdOutlineContentCopy />
                      </Button>
                      </div>
                      <div>
                        <a className="short-link" href={`${url.shortUrl}`}>
                          {url.shortUrl}
                        </a>
                      </div>
                      </Stack>
                    </Card.Title>
                  </Card.Body>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserUrlsList;
