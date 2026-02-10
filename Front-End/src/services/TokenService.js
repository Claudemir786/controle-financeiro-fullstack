import * as SecureStore from 'expo-secure-store';

export async function saveToken(token) {
    await SecureStore.setItemAsync('auth', token);

}

export async function getToken(){
    return await SecureStore.getItemAsync('authToken');

}

export async function logout(){
    await SecureStore.deleteItemAsync('authToken');
}

export async function saveName(name){
    await SecureStore.setItemAsync('name', name);
}

export async function getName() {
    return await SecureStore.getItemAsync('name');
}