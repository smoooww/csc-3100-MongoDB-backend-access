import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

        function removeOneCharacter(index) {
            const promise = fetch(`http://localhost:8000/users/${index}`, {
                method: "DELETE"
            })
            promise.then((res) => {
                if(res.status === 204) {
                    const updated = characters.filter((character) => {
                    return character._id !== index;
                    });
                    setCharacters(updated);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }

        function updateList(person) {
            postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                }
                })
            .then((userToAdd) => {
                if (userToAdd !== undefined) {
                setCharacters([...characters, userToAdd]);
                }
            })  
            .catch((error) => {
                console.log(error);
            })
            console.log("User in frontend", person);

        }

        function fetchUsers() {
            const promise = fetch("http://localhost:8000/users");
            return promise;
        }

        useEffect(() => {
            fetchUsers()
                .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"]))
                .catch((error) => {console.log(error);});
        }, []);

        function postUser(person) {
            const promise = fetch("http://localhost:8000/users", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(person),
            });
            return promise;
        }        
        
        return (
            <div className="container">
                <Table 
                characterData={characters} 
                removeCharacter={removeOneCharacter}
                />
                <Form handleSubmit={updateList} />
            </div>
        );
}

export default MyApp;