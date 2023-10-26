import React from 'react';
import Header from './components/Header';
import Users from './components/users'
import AddUser from './components/AddUser';
import axios from 'axios';

const baseUrl = "https://reqres.in/api/users?page=1"

class App extends React.Component {
  constructor(props){

    axios.get(baseUrl).then((res) => {
      this.setState({users: res.data.data})
    })
    super(props)
    this.state = {
        users: [
    // {
    //     id: 1,
    //     firstName: "Ivan",
    //     lastName: "Pirogov",
    //     bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia.",
    //     age: 33,
    //     isHappy: true
    // },
    // {
    //     id: 2,
    //     firstName: "Petr",
    //     lastName: "Dolin",
    //     bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora aspernatur nam facilis tenetur?",
    //     age: 22,
    //     isHappy: false
    // }
]
    }
    this.addUser = this.addUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.editUsers = this.editUsers.bind(this)
}
  render() {
    return (
      <div>
        <Header title="Список пользователей" />
        <main>
          <Users onEdit={this.editUsers} users={this.state.users} onDelete={this.deleteUser}/>
        </main>
        <aside>
          <AddUser onAdd={this.addUser} />
        </aside>
      </div>
    )
  }
  deleteUser(id){
    this.setState({
      users: this.state.users.filter((el)=>el.id !== id)
    })
  }
  editUsers(user){
    let allUsers = this.state.users
    allUsers[user.id -1] = user

    this.setState({users: []}, () => {
      this.setState({users: [...allUsers]})
    })
  }
  addUser(user){
    const id = this.state.users.length + 1
    this.setState({ users: [...this.state.users, {id, ...user}]})
  }
}

export default App
