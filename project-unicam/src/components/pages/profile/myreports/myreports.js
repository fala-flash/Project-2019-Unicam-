import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button, Card } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

class MyReports extends React.Component {
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
      if(this.state.visto[i] === 'true') {
        //eslint-disable-next-line
        this.state.visto[i] = 'success'
      } else if (this.state.visto[i] === 'false') {
        //eslint-disable-next-line
        this.state.visto[i] = 'danger'
      }
    }
  }

  readSegnalazioni() {  //leggo tutte le segnalazioni con id dell'utente loggato
    const rootRef = fire.database().ref();
    const segnalazioni = rootRef.child('Segnalazioni/')

    segnalazioni.once('value', snap => {
      snap.forEach(child => {
        if(child.val().id === this.props.userID)
        this.setState({
          segnalazioni: this.state.segnalazioni.concat([child.key]),
          testoSegnalazione: this.state.testoSegnalazione.concat([child.val().messaggio]),
          dataSegnalazione : this.state.dataSegnalazione.concat([child.val().data]),
          visto: this.state.visto.concat([child.val().visto])
        });
      });
    });
  }

  isInArray(value) {
    return this.state.segnalazioni.indexOf(value) > -1;
  }

  readDiscussioni() {
    const rootRef = fire.database().ref();
    const discussioni = rootRef.child('Discussioni/')

    discussioni.once('value', snap => {
       snap.forEach(child => {

        if (this.isInArray(child.key)) {  //segnalazione effettuata dall'utente loggato
          //annullo psicologo e commento
          this.setState({
            commento: []
          })
          child.forEach(extraChild => {
            this.setState({
              commento: this.state.commento.concat([<div>{extraChild.val().nome}:<br/>{extraChild.val().commento}<br/><br/></div>])
            });
          });
          this.setState({
            commentiPsicologo: this.state.commentiPsicologo.concat([this.state.commento])
          });
        }
      });
    });
  }

  getSegnalazioni() {
    return (
      <div>
        {this.setVisto()}
        {this.state.segnalazioni.map((codice, index) => (
          <div key={codice}>
            <br/>            
              <Card bg={this.state.visto[index]} text="white" className="cardStyle">              
                <Card.Header><Card.Title>Segnalazione #{codice} del {this.state.dataSegnalazione[index]}</Card.Title></Card.Header>
                <Card.Body>                
                  <Card.Text>
                    {this.state.testoSegnalazione[index]}
                  </Card.Text>                  
                </Card.Body>
                <Card.Footer className="footerMieSegn">             
                  {this.state.visto[index] === 'success'
                    ? 
                      <>
                        <p style={{fontWeight: "bold"}}>Risposta/e:</p>
                        <p>{this.state.commentiPsicologo[index]}</p>
                      </>
                    : <p style={{fontWeight: "bold"}}>In attesa di risposta</p>
                  }
                </Card.Footer>
              </Card>
          </div>
        ))}
      </div>
    )
  }

  componentWillMount() {
    this.readSegnalazioni() 
    this.readDiscussioni()    
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="info" href="/profile">
            <FaAngleLeft />
          </Button>          
        </div>
        <h3>Le mie segnalazioni</h3>
        {this.getSegnalazioni()}
      </div>
    );
  }
}

export default MyReports;
