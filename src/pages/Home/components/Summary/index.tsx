import { useEffect, useState } from "react";
import { api } from "../../../../lib/axios";
import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";

import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";

interface UserProps {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  company: string;
  followers: number;
}

export function Summary() {

  const [user,setUser] = useState<UserProps | undefined>(undefined);

  async function userData() {
    try{
      const response = await api.get<UserProps>("/users/Thursz")
      console.log(response.data)
      setUser(response.data);
    }catch(error){
      console.log("Problema aqui...",error);
    }
  }
  useEffect(()=> {
    userData();
  },[]);
  // "https://api.github.com/users", "/Thursz"
  // "https://api.github.com/search"
  // "https://api.github.com/repos/lucaspedronet/TudoLista/issues"

  return (
    <SummaryContainer>
      <img src={user?.avatar_url} />
      <section>
        <SummaryHeader>
          <h1>{user?.name}</h1> 
          <a href="https://github.com/Thursz" target="_blank"> 
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>{user?.login}</p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>{user?.bio}</span>
          </div>

          <div>
            <Buildings size={18} />
            <span>{user?.company}</span>
          </div>

          <div>
            <Users size={18} />
            <span>{user?.followers}</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
