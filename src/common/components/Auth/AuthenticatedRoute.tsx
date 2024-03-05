import { useEffect, useState, FC } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/common/utils/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthenticatedRoute: FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <>{element}</>;
  }
};

export default AuthenticatedRoute;
