const users = [
  { id: 1, name: 'Calvin Webster', username: 'calweb', password: 'calbo' },
  { id: 2, name: 'Aaron Lecheminant', username: 'bubba', password: 'bakergeek' }
]

function getUser (userId) {
  const foundUser = users.find(usr => Number(userId) === usr.id)
  return foundUser
}

function getUserByUsername (usrname) {
  const foundUser = users.find(usr => usrname === usr.username)
  return foundUser
}

function getUsers () {
  return users
}

module.exports = { getUser, getUserByUsername, getUsers }
