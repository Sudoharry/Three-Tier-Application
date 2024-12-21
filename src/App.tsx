import React, { useEffect, useState } from 'react';
import { Auth } from './components/Auth';
import { TaskList } from './components/TaskList';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        {!session ? <Auth /> : <TaskList />}
      </div>
    </>
  );
}

export default App;