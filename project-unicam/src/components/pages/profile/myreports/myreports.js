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
      idPsicologo: [],
      nomePsicologo: [],
      commento: [],
      nome: null
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

  readSegnalazioni() {
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
          child.forEach(extraChild => {
            this.setState({
              idPsicologo: this.state.idPsicologo.concat([extraChild.key]),
              commento: this.state.commento.concat([extraChild.val().commento])
            });
          });
        }
      });
    });
    /* this.readPsicologoName() */
  }  

 /*  readPsicologoName() {
    const rootRef = fire.database().ref();    

    /* psicologo.on('value', snap => {
        n = snap.val().nome
    });
    return n
  } */

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
                  {/* <p>id psicologo: {this.state.idPsicologo[index]}</p>
                  <p>nome psicologo: {this.state.nomePsicologo[index]}</p> */}
                  {this.state.visto[index] === 'success'
                    ? 
                      <>
                        <p style={{fontWeight: "bold"}}>Risposta:</p>
                        <p>{this.state.commento[index]}</p>
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
