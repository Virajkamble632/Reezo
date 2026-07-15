import { Video, Clock3, Users, CalendarDays, ArrowRight } from "lucide-react";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import api from '../../utils/api.js';

const Dashboard = () => {

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

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
    <div className="min-h-screen bg-[#030712]">

      {/* Navbar */}

        <DashboardNavbar/>

      {/* Sidebar */}

      <div className="flex">

        <DashboardSidebar/>

      {/* Main */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-4xl font-bold text-white">
              Welcome Back 👋
            </h2>

            <p className="mt-3 max-w-xl text-slate-400">
              Create secure meetings, collaborate with your team, and stay
              connected from anywhere with Reezo.
            </p>

          </div>

          <div className="flex gap-4">

            <button onClick={handleCreateMeeting}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              + Create Meeting
            </button>

            <p className="mt-3 text-slate-400">

              Join your team meeting instantly by entering a meeting code or shared
              invitation link.

            </p>

            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-violet-500"
            />

            <button
              onClick={handleJoinMeeting}
              className="mt-4 w-full rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
            >

              Join Now

            </button>

          </div>

        </div>

        {/* Quick Cards */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          {/* Create */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-500">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-3xl">

              📹

            </div>

            <h3 className="text-2xl font-semibold text-white">

              Instant Meeting

            </h3>

            <p className="mt-3 text-slate-400">

              Start a secure HD meeting instantly and invite anyone using a meeting
              link.

            </p>

            <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">

              Start Now

            </button>

          </div>

          {/* Join */}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-violet-500">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-3xl">

              🔗

            </div>

            <h3 className="text-2xl font-semibold text-white">

              Join Meeting

            </h3>

            <p className="mt-3 text-slate-400">

              Join your team meeting instantly by entering a meeting code or shared
              invitation link.

            </p>

            <button className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700">

              Join Now

            </button>

          </div>

          {/* Statistics */}

          <div className="mt-14">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Meeting Statistics
              </h2>

              <p className="text-sm text-slate-400">
                Your activity overview
              </p>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {/* Total Meetings */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-blue-500">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20">

                  <Video className="h-7 w-7 text-blue-400" />

                </div>

                <h3 className="text-4xl font-bold text-white">
                  124
                </h3>

                <p className="mt-2 text-slate-400">
                  Total Meetings
                </p>

              </div>

              {/* Hours Connected */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-500">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600/20">

                  <Clock3 className="h-7 w-7 text-cyan-400" />

                </div>

                <h3 className="text-4xl font-bold text-white">
                  312h
                </h3>

                <p className="mt-2 text-slate-400">
                  Hours Connected
                </p>

              </div>

              {/* Team Members */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-violet-500">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20">

                  <Users className="h-7 w-7 text-violet-400" />

                </div>

                <h3 className="text-4xl font-bold text-white">
                  28
                </h3>

                <p className="mt-2 text-slate-400">
                  Team Members
                </p>

              </div>

              {/* Upcoming */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-green-500">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600/20">

                  <CalendarDays className="h-7 w-7 text-green-400" />

                </div>

                <h3 className="text-4xl font-bold text-white">
                  8
                </h3>

                <p className="mt-2 text-slate-400">
                  Upcoming Meetings
                </p>

              </div>

            </div>

          </div>

          {/* Bottom Section */}

          <div className="mt-16 grid gap-8 xl:grid-cols-3">

            {/* Left Side */}

            <div className="xl:col-span-2">

              {/* Recent Meetings */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <div className="mb-6 flex items-center justify-between">

                  <h2 className="text-2xl font-bold text-white">
                    Recent Meetings
                  </h2>

                  <button className="text-blue-400 hover:text-blue-300">
                    View All
                  </button>

                </div>

                <div className="space-y-5">

                  {[
                    {
                      title: "Product Design Meeting",
                      participants: 8,
                      time: "Today • 10:30 AM",
                      status: "Completed",
                      color: "bg-slate-600",
                    },
                    {
                      title: "Weekly Team Sync",
                      participants: 12,
                      time: "Today • 2:00 PM",
                      status: "Live",
                      color: "bg-green-500",
                    },
                    {
                      title: "Client Discussion",
                      participants: 5,
                      time: "Yesterday • 6:00 PM",
                      status: "Completed",
                      color: "bg-slate-600",
                    },
                  ].map((meeting, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0F172A]/70 p-5 transition hover:border-blue-500"
                    >

                      <div>

                        <h3 className="text-lg font-semibold text-white">
                          {meeting.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {meeting.participants} Participants • {meeting.time}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-4 py-2 text-sm text-white ${meeting.color}`}
                      >
                        {meeting.status}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div className="space-y-6">

              {/* Upcoming */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <h2 className="mb-6 text-xl font-bold text-white">
                  Upcoming Meetings
                </h2>

                <div className="space-y-5">

                  <div className="rounded-2xl bg-[#0F172A]/70 p-4">

                    <h3 className="font-semibold text-white">
                      UI Review
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Tomorrow • 11:00 AM
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#0F172A]/70 p-4">

                    <h3 className="font-semibold text-white">
                      Sprint Planning
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Friday • 2:30 PM
                    </p>

                  </div>

                </div>

              </div>

              {/* Team Online */}

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <h2 className="mb-6 text-xl font-bold text-white">
                  Team Online
                </h2>

                <div className="space-y-4">

                  {["Alex", "Emma", "Sarah", "Viraj"].map((user) => (

                    <div
                      key={user}
                      className="flex items-center justify-between"
                    >

                      <div className="flex items-center gap-3">

                        <img
                          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user}`}
                          alt={user}
                          className="h-11 w-11 rounded-full"
                        />

                        <span className="text-white">
                          {user}
                        </span>

                      </div>

                      <span className="h-3 w-3 rounded-full bg-green-400"></span>

                    </div>

                  ))}

                </div>

              </div>

              {/* Quick Actions */}

              <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 to-violet-600 p-6">

                <h2 className="text-xl font-bold text-white">
                  Quick Actions
                </h2>

                <div className="mt-6 space-y-4">

                  <button className="w-full rounded-xl bg-white/10 py-3 text-white hover:bg-white/20">
                    + Schedule Meeting
                  </button>

                  <button className="w-full rounded-xl bg-white/10 py-3 text-white hover:bg-white/20">
                    Invite Team
                  </button>

                </div>

              </div>

            </div>

          </div>        

        </div>

      </div>
     </div>             
    </div>
  );
};

export default Dashboard;