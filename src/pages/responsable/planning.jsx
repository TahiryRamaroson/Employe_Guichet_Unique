import {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PlanningDialog from "@/widgets/layout/planning-dialog";

export function Planning() {

  const navigate = useNavigate();

  const checkToken = () => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      navigate('/auth/sign-in');
    }

    try {
      const decodedtoken = jwtDecode(token);
      const now = Date.now() / 1000;
      if(now > decodedtoken.exp || decodedtoken.profil != "Responsable guichet unique") {
        sessionStorage.removeItem('authToken');
        navigate('/auth/sign-in');
      }
    } catch (error) {
      sessionStorage.removeItem('authToken');
      navigate('/auth/sign-in');
    }

  };

  useEffect(() => {
    checkToken();
  }, [navigate]);

    const localizer = momentLocalizer(moment);

    const [events, setEvents] = useState([
      {
        id: 1,
        title: null,
        start: new Date(),
        end: new Date(),
        color: '#eaf6ff',
      },
    ]);
  
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentSlot, setCurrentSlot] = useState(null);
  
    const handleSelectSlot = ({ start, end }) => {
      setCurrentSlot({ start, end });
      setIsDialogOpen(true);
    };
  
    const handleSaveEvent = ({ intervenant, responsable, localisation }) => {
      const newEvents = [];
    
      if (intervenant) {
        newEvents.push({
          id: events.length + 1,
          start: currentSlot.start,
          end: currentSlot.end,
          color: '#4caf50',   //vert
          title: intervenant,
        });
      }
    
      if (responsable) {
        newEvents.push({
          id: events.length + 2,
          start: currentSlot.start,
          end: currentSlot.end,
          color: '#2196f3',     //bleu
          title: responsable,
        });
      }

      if (localisation.region && localisation.district && localisation.commune) {
        newEvents.push({
          id: events.length + 3,
          start: currentSlot.start,
          end: currentSlot.end,
          color: '#f44336',     //rouge
          title: `Région: ${localisation.region}, District: ${localisation.district}, Commune: ${localisation.commune}`,
        });
      }
    
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      setIsDialogOpen(false); // Fermer le dialog après l'ajout de l'événement
    };
  
    const handleNavigate = (date) => {
      setSelectedDate(date);
    };

    const handleDeleteEvent = (eventId) => {
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
    };

    const eventStyleGetter = (event) => {
      const backgroundColor = event.color || 'defaultColor';
      const style = {
        backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      };
      return { style };
    };

  return (
    <div className="mt-12 mb-12">
          <div className="flex justify-center">
            <Card className="mt-6 w-full flex justify-center">
              <div className="text-center mb-4 mt-6">
                <Typography variant="h3" color="black">
                    Planning GU
                </Typography>
                <div className="flex gap-5 ml-6">
                  <Card className="w-35 flex justify-center rounded" color="green">Intervenant</Card>
                  <Card className="w-35 flex justify-center rounded" color="blue">Responsable</Card>
                  <Card className="w-35 flex justify-center rounded" color="red">Localisation</Card>
                </div>
              </div>
              <CardBody>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onNavigate={handleNavigate}
                    date={selectedDate}
                    eventPropGetter={eventStyleGetter}
                    //onSelectEvent={(event) => handleDeleteEvent(event.id)}
                />
              </CardBody>
            </Card>
            <PlanningDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              onSave={handleSaveEvent}
            />
          </div>
    </div>
  );
}

export default Planning;
