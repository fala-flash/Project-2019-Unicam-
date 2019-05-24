import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Card, Tabs, Tab } from "react-bootstrap";

class LeMieSegnalazioni extends React.Component {
  constructor() {
    super();
    this.state = {
      segnalazioni: [],
      testoSegnalazione: [],
      dataSegnalazione: [],
      visto: [],
      commentiPsicologo: [],
      commento: []
    };
  }

  setVisto() {
    for (var i = 0; i < this.state.visto.length; i++) {
      if (this.state.visto[i] === "true") {
        //eslint-disable-next-line
        this.state.visto[i] = "success";
      } else if (this.state.visto[i] === "false") {
        //eslint-disable-next-line
        this.state.visto[i] = "danger";
      }
    }
  }

  readSegnalazioni() {
    //leggo tutte le segnalazioni con id dell'utente loggato
    const rootRef = fire.database().ref();
    const segnalazioni = rootRef.child("Segnalazioni/");

    segnalazioni.once("value", snap => {
      snap.forEach(child => {
        if (child.val().id === this.props.userID) {
          this.setState({
            segnalazioni: this.state.segnalazioni.concat([child.key]),
            testoSegnalazione: this.state.testoSegnalazione.concat([
              child.val().messaggio
            ]),
            dataSegnalazione: this.state.dataSegnalazione.concat([
              child.val().data
            ]),
            visto: this.state.visto.concat([child.val().visto])
          });
          rootRef
            .child("Segnalazioni/" + child.key + "/Commenti")
            .once("value", snapCommenti => {
              snapCommenti.forEach(extraChild => {
                this.setState({
                  commento: this.state.commento.concat([
                    <div>
                      <hr />
                      <span>({extraChild.val().data}) </span>
                      {extraChild.val().nome}:<br />
                      {extraChild.val().commento}
                    </div>
                  ])
                });
              });
              this.setState({
                commentiPsicologo: this.state.commentiPsicologo.concat([
                  this.state.commento
                ]),
                commento: []
              });
            });
        }
      });
    });
  }

  isInArray(value) {
    return this.state.segnalazioni.indexOf(value) > -1;
  }

  getTutteSegnalazioni() {
    if (this.state.segnalazioni.length > 0) {
      return (
        <div>
          {this.setVisto()}
          {this.state.segnalazioni.map((codice, index) => (
            <div key={codice}>
              <br />
              <Card
                style={{ borderRadius: "20px" }}
                bg={this.state.visto[index]}
                text="white"
                className="cardStyle"
              >
                <Card.Header>
                  <Card.Title>
                    Segnalazione #{codice} del{" "}
                    {this.state.dataSegnalazione[index]}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{this.state.testoSegnalazione[index]}</Card.Text>
                  {this.state.visto[index] === "success" ? (
                    <>
                      <text style={{ fontWeight: "bold" }}>Risposta/e:</text>
                      <p>{this.state.commentiPsicologo[index]}</p>
                    </>
                  ) : (
                    <text style={{ fontWeight: "bold" }}>
                      In attesa di risposta
                    </text>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non hai ancora effettuato alcuna segnalazione</h5>
        </div>
      );
    }
  }

  getLetteSegnalazioni() {
    if (this.state.segnalazioni.length > 0) {
      return (
        <div>
          {this.setVisto()}
          {this.state.segnalazioni.map((codice, index) => (
            <div key={codice}>
              <br />
              {this.state.visto[index] === "success" ? (
                <div>
                  <Card
                    style={{ borderRadius: "20px" }}
                    bg={this.state.visto[index]}
                    text="white"
                    className="cardStyle"
                  >
                    <Card.Header>
                      <Card.Title>
                        Segnalazione #{codice} del{" "}
                        {this.state.dataSegnalazione[index]}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {this.state.testoSegnalazione[index]}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="footerMieSegn">
                      {this.state.visto[index] === "success" ? (
                        <>
                          <text style={{ fontWeight: "bold" }}>
                            Risposta/e:
                          </text>
                          <p>{this.state.commentiPsicologo[index]}</p>
                        </>
                      ) : (
                        <text style={{ fontWeight: "bold" }}>
                          In attesa di risposta
                        </text>
                      )}
                    </Card.Footer>
                  </Card>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non hai ancora effettuato alcuna segnalazione</h5>
        </div>
      );
    }
  }

  getNonLetteSegnalazioni() {
    if (this.state.segnalazioni.length > 0) {
      return (
        <div>
          {this.setVisto()}
          {this.state.segnalazioni.map((codice, index) => (
            <div key={codice}>
              <br />
              {this.state.visto[index] === "danger" ? (
                <div>
                  <Card
                    style={{ borderRadius: "20px" }}
                    bg={this.state.visto[index]}
                    text="white"
                    className="cardStyle"
                  >
                    <Card.Header>
                      <Card.Title>
                        Segnalazione #{codice} del{" "}
                        {this.state.dataSegnalazione[index]}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {this.state.testoSegnalazione[index]}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="footerMieSegn">
                      {this.state.visto[index] === "success" ? (
                        <>
                          <text style={{ fontWeight: "bold" }}>
                            Risposta/e:
                          </text>
                          <p>{this.state.commentiPsicologo[index]}</p>
                        </>
                      ) : (
                        <text style={{ fontWeight: "bold" }}>
                          In attesa di risposta
                        </text>
                      )}
                    </Card.Footer>
                  </Card>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h5>Non ci sono segnalazioni lette</h5>
        </div>
      );
    }
  }

  componentWillMount() {
    this.readSegnalazioni();
    this.props.setLocation("Le mie segnalazioni");
    this.props.setisHome("profile");
  }

  getSegnalazioni() {
    return (
      <div>
        <Tabs
          style={{ position: "fixed" }}
          className="tabsDiv"
          defaultActiveKey="tutte"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="tutte" title="Tutte">
            <br />
            <br />
            {this.getTutteSegnalazioni()}
          </Tab>
          <Tab eventKey="lette" title="Lette">
            <br />
            <br />
            {this.getLetteSegnalazioni()}
          </Tab>
          <Tab eventKey="nonLette" title="Non Lette">
            <br />
            {this.getNonLetteSegnalazioni()}
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    return <div>{this.getSegnalazioni()}</div>;
  }
}

export default LeMieSegnalazioni;
