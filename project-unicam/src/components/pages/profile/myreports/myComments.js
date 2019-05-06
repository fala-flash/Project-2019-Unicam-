import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button, Card } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

class MyComments extends React.Component {
  constructor() {
    super();
    this.state = { 
      idSegnalazione: [],
      testoSegnalazione: [],
      dataSegnalazione: [],
      visto: [],
      commentoPsicologo: []
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

  readDiscussioni() {
    const rootRef = fire.database().ref();
    const discussioni = rootRef.child('Discussioni/')

    discussioni.once('value', snap => {
       snap.forEach(child => {        
          child.forEach(extraChild => {
              if(extraChild.key === this.props.userID) {
                  this.setState({
                      idSegnalazione: this.state.idSegnalazione.concat([child.key]),
                      commentoPsicologo: this.state.commentoPsicologo.concat([extraChild.val().commento])
                  })
              }
          });
      });
    });
  } 
  
  isInArray(value) {
    return this.state.idSegnalazione.indexOf(value) > -1;
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazioni = rootRef.child('Segnalazioni/')

    segnalazioni.once('value', snap => {
      snap.forEach(child => {

        if (this.isInArray(child.key)) {  //segnalazionecommentata dallo psicologo loggato          
            this.setState({
              testoSegnalazione: this.state.testoSegnalazione.concat([child.val().messaggio]),
              dataSegnalazione: this.state.dataSegnalazione.concat([child.val().data]),
              visto: this.state.visto.concat([child.val().visto])
            });       
        }
      });
    });
  }

  getSegnalazioni() {
    return (
      <div>
        {this.setVisto()}
        {this.state.idSegnalazione.map((codice, index) => (
          <div key={codice}>
            <br/>            
              <Card bg={this.state.visto[index]} text="white" className="cardStyle">              
                <Card.Header><Card.Title>Segnalazione #{codice} del: {this.state.dataSegnalazione[index]} </Card.Title></Card.Header>
                <Card.Body>                
                  <Card.Text>
                    {this.state.testoSegnalazione[index]}
                  </Card.Text>                  
                </Card.Body>
                <Card.Footer className="footerMieSegn">
                {this.state.visto[index] === 'success'
                    ? 
                      <>
                        <p style={{fontWeight: "bold"}}>Risposta:</p>
                        <p>{this.state.commentoPsicologo[index]}</p>
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
    this.readDiscussioni()
    this.readSegnalazioni()
}

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="info" href="/profile">
            <FaAngleLeft />
          </Button>          
        </div>
        <h3>Le mie risposte</h3>
        {this.getSegnalazioni()}
      </div>
    );
  }
}

export default MyComments;