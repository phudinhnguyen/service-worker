class User {
  userId: string = ""
  userName: string = ""
  userFullName: string = ""
  userStatus: string = ""
  userContent: string = ""
  userPhone: number = 12345678910
  userEmail: string = ""
  userLevel: number
  groupId: string = ""
  createAt: string = ""
  updatedAt: string = ""
  userPermissions: string = ""
  permissions: string = ""

  constructor(user) {
    if (!user) return
    Object.keys(this).forEach(key => {
      if (user[ key ]) {
        this[ key ] = user[ key ]
      }
    })
  }
}

export default User