import React, { useContext, useState} from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native'
import { Appbar, Avatar, Button, Chip, List } from 'react-native-paper'
import { COLORS } from '../utils/app_constants'
import ProfileBottomSheet from './ProfileBottomSheet'
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'
import { UserContext } from '../context/UserContext'
import { collection, getDocs, limit, query, where} from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseConfig'

const ProfileTab = ({navigation}) => {

  const [showModal, setShowModal] = React.useState(false)
  const [user, setUser] = useContext(UserContext)
  const dateAccountCreated = user?.createdAt ?? '20-11-2022'
  const [favoriteBookList, setFavoriteBookList] = useState([])
  const formattedDateFromFirestore = new Date(dateAccountCreated.seconds * 1000 + dateAccountCreated.nanoseconds/1000000)
  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState)
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@library_management_app_user_data')
        if(value !== null) {
          setUser(JSON.parse(value))
        }
      } catch(e) {
        // error reading value
      }
    }
    getData()
  }, [])

  const handleSignOut = async () => {
    await AsyncStorage.clear().then(() => {
      setUser()
      navigation.navigate('Signin')
    })
  }

  React.useEffect(() => {
    const getUserBookFavorites = async () => {
      const userReference = `users/${user?.docId}`
      const favoriteRefs = query(collection(db, "favorites"), where("user", "==", userReference));
      const querySnapshot = await getDocs(favoriteRefs);
      let userFavoriteList = []
      querySnapshot.forEach((doc) => {
        userFavoriteList.push({favoriteId: doc.id, ...doc.data()})
     });
     setFavoriteBookList([...userFavoriteList])
    }
    getUserBookFavorites()
  }, [])

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
    > 
      <Appbar.Header style={{backgroundColor: COLORS.RED, display: 'flex', alignItems: 'center'}} >
        <Appbar.BackAction onPress={() => {navigation.goBack()}} size={23} color={COLORS.WHITE}/>
        <Text style={{flex: 1, textAlign: 'center', fontSize: 21, color: COLORS.WHITE, fontWeight: '700'}}>Profile</Text>
        <Button onPress={handleToggleModal} color={COLORS.RED}>
          <Feather name="settings" size={20} color={COLORS.WHITE}/>
        </Button>
      </Appbar.Header>
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.RED, height: 300, borderBottomEndRadius: 20, borderBottomLeftRadius: 20, flex: 1}}>
        <Avatar.Image size={150} source={{uri: 'https://picsum.photos/700'}} />
        <View style={{ paddingTop: 22,display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 'auto'}}>
          <Text style={{color: COLORS.WHITE, fontSize: 25, marginRight: 10, textTransform: 'capitalize'}}>{user?.fullname ?? 'Not set'}</Text>
          <MaterialIcons name='check-circle' size={21} color={COLORS.WHITE}/>
        </View>
      </View>
      <List.Item
        title="Username"
        description={user?.username ?? 'Not set'}
        left={props => <List.Icon {...props} icon='account' />}
        style={{paddingVertical: 15}}
      />
      <List.Item
        title="Email"
        description={user?.email ?? 'Not set'}
        left={props => <List.Icon {...props} icon="email" />}
        style={{paddingVertical: 15}}
      />
      <List.Item
        title="Date joined"
        description={moment(formattedDateFromFirestore).format('MMM DD, YYYY') ?? ''}
        left={props => <List.Icon {...props} icon="set-all" />}
        style={{paddingVertical: 15}}
      />
      <List.Item
        title="Books added to Favorites"
        description={(favoriteBookList?.length).toString()}
        left={props => <List.Icon {...props} icon="heart" />}
        style={{paddingVertical: 15}}
      />
       <View style={{paddingHorizontal: 22, marginVertical: 30}}>
        <Button 
          buttonColor={COLORS.RED}
          contentStyle={{
            paddingVertical: 10
          }}
          icon="logout" 
          mode="contained" 
          onPress={handleSignOut}>
            Log out
          </Button>
       </View>
      <ProfileBottomSheet showModal={showModal} handleToggleModal={handleToggleModal}/>
    </ScrollView>
  )
}

export default ProfileTab 

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.WHITE
  },
  newCollectionText: {
    color: COLORS.WHITE,
    fontSize: 22,
    padding: 22,
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: 30,
    color: COLORS.WHITE,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bolder',
    marginTop: StatusBar.currentHeight
  }
})