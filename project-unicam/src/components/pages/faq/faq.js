import React from 'react';
import Card from 'react-bootstrap/Card';

//eslint-disable-next-line
import Style from './faq.css';

function Faq
() {
    return (
        <div>
            <h3 style={{fontWeight:'bold'}}>Faq</h3>
            <br/>
            <p>"Conosci il nemico come conosci te stesso. Se farai così, anche in mezzo a cento battaglie non ti troverai mai in pericolo."
              <p>- Sun Tzu</p></p>
            <p>Ad oggi, il fenomeno di bullismo e cyberbullismo e incredibilmente sottovalutato e ancor meno conosciuto.</p>
            <p>Di seguito scoprirai quanto questo fenomeno è presente nella nostra società</p>
            <br />
            <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
              <Card.Header><h4>Che cosa si intende con bullismo?</h4></Card.Header>
              <Card.Body>
                <Card.Text>
                  Con il termine bullismo s’intende definire un comportamento aggressivo 
                  ripetitivo nei confronti di chi non è in grado di difendersi. Solitamente,
                  i ruoli del bullismo sono ben definiti: da una parte c’è il bullo, colui 
                  che attua dei comportamenti violenti fisicamente e/o psicologicamente e
                  dall’altra parte la vittima, colui che invece subisce tali atteggiamenti. 
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
            <Card.Header><h3>In Italia, quanto è diffuso il bullismo ? </h3></Card.Header>
            <Card.Body>
              <Card.Text>
                In un indagine ISTAT del 2015, più del 50% degli intervistati
                11-17enni riferisce di essere rimasto vittima, nei 12 mesi precedenti
                l’intervista, di un qualche episodio offensivo, non rispettoso e/o violento. Una
                percentuale significativa, quasi uno su cinque (19,8%), dichiara di aver subìto
                azioni tipiche di bullismo una o più volte al mese. In circa la metà di questi casi
                (9,1%), si tratta di una ripetizione degli atti decisamente asfissiante, una o più
                volte a settimana
              </Card.Text>
            </Card.Body>
          </Card>
          <br />

  <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
    <Card.Header><h3>Ed il CyberBullismo? </h3></Card.Header>
    <Card.Body>
      <Card.Text>
      Il cyberbullismo ha colpito il 22,2% di tutte le vittime di bullismo. Nel 5,9% dei
casi si è trattato di azioni ripetute (più volte al mese). La maggior propensione
delle ragazze/adolescenti a utilizzare il telefono cellulare e a connettersi a
Internet probabilmente le espone di più ai rischi della rete e dei nuovi
strumenti di comunicazione.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />

  <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
    <Card.Header><h3>Quali sono le conseguenze del bullismo? </h3></Card.Header>
    <Card.Body>
      <Card.Text>
      Per le vittime il rischio è quello di manifestare il disagio innanzitutto attraverso 
      sintomi fisici (es. mal di pancia, mal di testa) o psicologici (es. incubi, attacchi d’ansia),
       associati ad una riluttanza nell’andare a scuola. In caso di prevaricazioni protratte nel tempo,
        le vittime possono intravedere come unica possibilità per sottrarsi al bullismo quella di cambiare scuola,
         fino ad arrivare in casi estremi all’abbandono scolastico; alla lunga, le vittime mostrano 
         una svalutazione di sé e delle proprie capacità, insicurezza, problemi sul piano relazionale, 
         fino a manifestare, in alcuni casi, veri e propri disturbi psicologici, tra cui quelli d’ansia o depressivi.

      </Card.Text>
    </Card.Body>
  </Card>
  <br />

  <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
    <Card.Header><h3>Secondo i ragazzi come si risolve una situazione di bullismo? </h3></Card.Header>
    <Card.Body>
      <Card.Text>
      Di fronte a una situazione di bullismo, la maggioranza, soprattutto le ragazze,
ritiene che confidandosi con le persone “più vicine” sia possibile definire
meglio la reazione e/o il comportamento da tenere. Infatti, il 65% (60,4% dei
maschi e 69,9% delle femmine) ritiene sia una strategia positiva rivolgersi ai
genitori per chiedere aiuto, il 41% (37,4% dei maschi e 44,8% delle femmine)
ritiene opportuno rivolgersi agli insegnanti.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />

  <Card  className="faqcard" bg="info" text="white" style={{ width: '22rem' }}>
    <Card.Header><h3>Come combatterlo? </h3></Card.Header>
    <Card.Body>
      <Card.Text>
      Intervenire precocemente è di fondamentale importanza. L’errore più comune è pensare che
       tanto il tempo sistemerà le cose. Per le situazioni meno gravi di bullismo, vale a dire
        quelle in cui non c’è marcata e ripetuta aggressività, ma canzonature e qualche scherzo, 
        sono spesso sufficienti un ascolto partecipato, rassicurazione e supporto da parte di figure
         adulte significative. Per i casi più gravi è importante l’intervento diretto degli insegnanti,
          dei genitori e talora anche dell’autorità guidiziaria, ed è sempre importante considerare l
          ’opportunità di un intervento psicoterapico.

      </Card.Text>
    </Card.Body>
  </Card>
  <br />

        </div>
    );
}

export default Faq;