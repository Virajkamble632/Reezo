import { Video, Link2, CalendarPlus, UserPlus, ArrowRight, } from "lucide-react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import api from '../../utils/api.js';
import { useAuth } from "../../context/AuthContext.jsx";

const Dashboard = () => {

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const { user } = useAuth();

  const handleCreateMeeting = async () => {
    console.log("Create Meeting clicked");
    try{
      const { data } = await api.post('/meeting/create');
      console.log(data);
      toast.success(data.message);
      navigate(`/meeting/${data.meeting.roomId}`);
    } catch(error){
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to create meeting."
      );
    }
  };

  const handleJoinMeeting = async () => {
    if(!roomId) {
      return toast.error('Please enter a Meeting ID');
    }

    try{
      const { data } = await api.post('/meeting/join', {roomId});
      toast.success(data.message);
      navigate(`/meeting/${roomId}`);

    } catch(error){
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Failed to join meeting."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden">

      {/* Navbar */}

        <DashboardNavbar/>

      {/* Main */}

        <div className="mx-auto mt-8 max-w-7xl px-4 py-8 sm:px-8 xl:px-10">

          {/* Welcome */}

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

           

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-3xl">
            Welcome Back,  {user?.name} 
          </h1>

            

          </div>

        

          

          

            {/* Quick Access */}

            <div className="mt-20 mb-30 overflow-hidden">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-white">
                    Quick Access
                  </h2>

                  <p className="mt-2 text-slate-400">
                    Start collaborating instantly with your team.
                  </p>

                </div>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                {/* Start Meeting */}

                <div
                  onClick={handleCreateMeeting}
                  className="group cursor-pointer rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 to-blue-900/10 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-500"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20">

                    <Video className="h-8 w-8 text-blue-400" />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Start Meeting
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Create an instant HD meeting and invite anyone with one click.
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all">

                    Start Now

                    <ArrowRight size={18} />

                  </div>

                </div>

                {/* Join Meeting */}

                <div
                  className="group rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/15 to-violet-900/10 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20">

                    <Link2 className="h-8 w-8 text-violet-400" />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">
                    Join Meeting
                  </h3>

                  <p className="mt-3 text-slate-400">
                    Join a meeting using a meeting ID shared by your team.
                  </p>

                    <input
                      type="text"
                      placeholder="Enter Meeting ID"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full mt-3 rounded-xl border border-white/10 bg-[#0F172A]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500"
                    />

                  <button
                    onClick={handleJoinMeeting}
                    className="mt-8 flex items-center gap-2 text-violet-400 transition-all hover:gap-4"
                  >

                    Join Now

                    <ArrowRight size={18} />

                  </button>

                </div>



              </div>

            </div>


 

          </div>

        </div>
               
  );
};

export default Dashboard;