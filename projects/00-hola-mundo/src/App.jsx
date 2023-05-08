import "./App.css";
import "./index.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export const App = () => {
  const users = [
    {
      id: 1,
      username: 'sabrinaSpellman',
      name: 'Sabrina Spellman',
      initialIsFollowing: true,
      avatar: 'https://i.pinimg.com/564x/d7/89/ae/d789aee775f3c3384441eea865c2bb6c.jpg'
    },
    {
      id: 2,
      username: "ElonMusk",
      name: "Elon Musk",
      initialIsFollowing: false,
      avatar: "https://i.pinimg.com/564x/94/b4/54/94b454f14c145475b78da427122b29bb.jpg"
    },
    {
      id: 3,
      username: "spiderman",
      name: "Peter Parker",
      initialIsFollowing: true,
      avatar: "https://i.pinimg.com/564x/af/82/bd/af82bd951ce6e3ada77d5af879eafa57.jpg"
    }
  ]

  return (
    <section className="App">
      {
        users.map(user => {
          const { id } = user;

          return (
            <TwitterFollowCard
              key={id}
              {...user}
            >
            </TwitterFollowCard>
          )
        })
      }
    </section>
  );
};
