import React from "react";
import { fire } from "../../../../config/FirebaseConfig";
import { Button } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";

class MyConversation extends React.Component {
  constructor() {
    super();
    this.state = { 
      segnalazioni: [],
      idSegnalazione: [],
      idPsicologo: [],
      nomePsicologo: [],
      commento: [],
      nome: null
    }; // <- set up react state
  }

  readSegnalazioni() {
    const rootRef = fire.database().ref();
    const segnalazioni = rootRef.child('Segnalazioni/')

    segnalazioni.once('value', snap => {
      snap.forEach(child => {
        if(child.val().id === this.props.userID)
        this.setState({
          segnalazioni: this.state.segnalazioni.concat([child.key])
        });
      });
    });
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
    this.readPsicologoName()
  }

  isInArray(value) {
    return this.state.segnalazioni.indexOf(value) > -1;
  }

  readPsicologoName() {
    const rootRef = fire.database().ref();
    
    for (var i=0; i<this.state.idPsicologo.length; i++) {
      rootRef.child('Psicologo/'+this.state.idPsicologo[i]).on('value', snap => {
        alert(snap.val().nome)
      })
    }

    /* psicologo.on('value', snap => {
        n = snap.val().nome
    });
    return n */
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
        {this.state.segnalazioni.map((codice, index) => (
          <div key={codice}>
            <p>Codice: {codice}</p>
            <p>id psicologo: {this.state.idPsicologo[index]}</p>
            <p>nome psicologo: {this.state.nomePsicologo[index]}</p>
            <p>commento: {this.state.commento[index]}</p>
          </div>
        ))}

      </div>
    );
  }
}

export default MyConversation;
