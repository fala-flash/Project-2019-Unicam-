import React, { Component } from 'react';
import { fire } from '../../../config/FirebaseConfig';
import { Button, Form } from 'react-bootstrap';

class Profile extends Component{

    constructor() {
        super();
        this.state = {
            istituto: null,
            telefono: null
          }      
      }

      readUserData() {
        const rootRef = fire.database().ref('Utente/'+this.props.userID);
        
        rootRef.on('value', snap => {
            this.setState({
                istituto: snap.val().istituto,
                telefono: snap.val().telefono
            })  
        })         
      }

      writeUserData(id, no, em, tel, ist) {
        fire.database().ref('Utente/' + id).set({
            nome: no,
            email: em,
            telefono: tel,
            istituto: ist
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
      }

      aggornaDati() {
        const istituto = this.aggiornaIstituto.value            
        const telefono = this.aggiornaTelefono.value
        if (istituto !== '' && telefono !== '') {          
          this.writeUserData(this.props.userID, this.props.name, this.props.email, telefono, istituto)
          //alert('dati aggiornati')
        } else {
          alert("Tutti i campi devono essere compilati")
        }
        //this.datiForm.reset();
      }

      componentDidMount() {
        this.readUserData()
      }

      render () {
        return (
            <div>
                <h1>Profilo</h1>
                
                {this.props.picture === 'null'
                ? <Button variant="outline" href="/profile" size="sm">
                    Inserisci immagine
                  </Button>
                : <Button variant="outline" href="/profile" size="sm">
                    <img className="profileImg" src={this.props.picture} alt="UserPicture"/>
                  </Button> 
                }

                <p>Nome: {this.props.name}</p>
                <p>email: {this.props.email}</p>


                <Form className="formDati" onSubmit={(event) => this.aggornaDati(event)} ref={(form) => { this.datiForm = form }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Istituto</Form.Label>
                        <Form.Control type="text" placeholder={this.state.istituto} ref={(input) => { this.aggiornaIstituto = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" placeholder={this.state.telefono} ref={(input) => { this.aggiornaTelefono = input }}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                    </Form.Group>
                    <br></br>            
                    <Button variant="outline-dark" type="submit">
                        Aggiorna
                    </Button>                       
                </Form>
            </div>
        );
      }    
}

export default Profile;