import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '../components/Icon';
import ListItem from '../components/lists/ListItem';
import ListItemSeparator from '../components/lists/ListItemSeparator';
import Screen from '../components/Screen';
import colors from '../config/colors';



const menuItems=[
    {
        title: 'Number of Liked movies: 0',
        icon:{
            name: 'thumb-up',
            backgorundColor: colors.primary
        },
    },
    {   title: 'Number of Rated movies: 0',
    icon:{
            name: 'star-outline',
            backgorundColor: colors.gold
        },
    }
]

function AccountScreen() {
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
            <ListItem
                title="Maxym Lyskov"
                subTitle="maxym@domain.com"
                image={require('../../assets/icon.png')}
            />
            </View>
            <View style={styles.container}>
            <FlatList
                data={menuItems}
                keyExtractor={menuItem => menuItem.title}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({item})=>(
                    <ListItem 
                    title={item.title}
                    IconComponent={<Icon
                        name={item.icon.name}
                        backgroundColor={item.icon.backgorundColor} />}
                    onPress={() => console.log('it works')}
                    />
                )}
                />
            </View>
            <View style={styles.logout}>
                <ListItem
                title= 'Log Out'
                IconComponent={<Icon
                    title= 'Log Out'
                    name='logout'
                    backgroundColor={colors.blue} />}
                onPress={()=> console.log('log out')} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 25
    },
    screen:{
        backgroundColor: colors.halfdark

    },
    logout: {
        paddingVertical: 50
    }
})

export default AccountScreen;