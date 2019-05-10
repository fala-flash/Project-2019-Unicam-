import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Card } from "react-bootstrap";

class LeMieRisposte extends React.Component {
  constructor() {
    super();
    this.state = {
      idSegnalazione: [],
      testoSegnalazione: [],
      dataSegnalazione: [],
      visto: [],
      commentoPsicologo: [],
      dataCommentoPsicologo:[]
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
    const segnalazione = rootRef.child('Segnalazioni/')

    segnalazione.once('value', snap => {
      snap.forEach(child => {
        rootRef.child('Segnalazioni/'+child.key+'/Commenti').once('value', snapCommenti => {
          snapCommenti.forEach(extraChild => {
            if(extraChild.key === this.props.userID) {
              this.setState({
                idSegnalazione : this.state.idSegnalazione.concat([child.key]),
                testoSegnalazione: this.state.testoSegnalazione.concat([child.val().messaggio]),
                dataSegnalazione: this.state.dataSegnalazione.concat([child.val().data]),
                visto: this.state.visto.concat([child.val().visto]),
                commentoPsicologo: this.state.commentoPsicologo.concat(extraChild.val().commento),
                dataCommentoPsicologo: this.state.dataCommentoPsicologo.concat(extraChild.val().data)
              });
            }            
          });          
        });    
      });
    });
  }

  getSegnalazioni() {
    if (this.state.idSegnalazione[0] !== undefined) {
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
                          <div><hr/><span>({this.state.dataCommentoPsicologo[index]}) </span> Tu:  {this.state.commentoPsicologo[index]}<br/></div>
                        </>
                      : <p style={{fontWeight: "bold"}}>In attesa di risposta</p>
                    }
                  </Card.Footer>
                </Card>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div>
          <br/>
          <h5>Non hai ancora commentato alcuna segnalazione</h5>
        </div>
      )
    }
    
  }

  componentWillMount() {
    this.readSegnalazioni()
    this.props.setLocation("Le mie risposte")
    this.props.setisHome('profile')
  }

  render() {
    return (
      <div>
        {this.getSegnalazioni()}
      </div>
    );
  }
}

export default LeMieRisposte;
