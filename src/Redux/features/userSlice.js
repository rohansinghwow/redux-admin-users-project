import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: [
        {
            name: 'Tania',
            username: 'floppydiskette',
            password: '123',
            admin: false

        },
        {
            name: 'Timm',
            username: 'zeitgeist',
            password: '123',
            admin: true

        },
        {
            name: 'Craig',
            username: 'siliconeidolon',
            password: '123',
            admin: false

        }
    ],
    user: {
        name: '',
        username: '',
        password: '',
        admin: false
    },

    showModal: false,

    isEditing: false,
    isLogin: false,


}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.allUsers = [...state.allUsers, action.payload]
        },
        removeUser: (state, action) => {
            state.allUsers = state.allUsers.filter((item, index) => index !== action.payload)
        },
        editUser: (state, action) => {
            state.allUsers = state.allUsers.map((item, index) => {
                if (index === action.payload) {
                    return state.user
                } else {
                    return item
                }
            }
            )
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload
        },
        setName: (state, action) => {
            state.user.name = action.payload
        },
        setUserName: (state, action) => {
            state.user.username = action.payload
        },
        setPassword: (state, action) => {
            state.user.password = action.payload
        },
        setAdmin: (state, action) => {
            state.user.admin = action.payload
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        }
    }

})

export const { addUsers, removeUser, setShowModal, setName, setUserName, editUser, setIsEditing, setIsAdmin, setIsLogin, setAdmin, setPassword } = userSlice.actions

export default userSlice.reducer;