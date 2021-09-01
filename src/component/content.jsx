import React from 'react'
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, TouchableOpacityBase } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Entypo, AntDesign } from '@expo/vector-icons'

import Data from '../data'

class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    renderItem(item, index) {
        return (
            <View key={index}>
                <Text>{item.name}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.content}>
                <FlatList 
                    data={Data.items}
                    keyExtractor={item => (item.id).toString()}
                    renderItem={ (item, index) => <ListItem item={item.item} index={index} /> }
                    ItemSeparatorComponent={() => <View  style={{flex: 1 }} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const ListItem = ({item, index}) => {

    const rightActions = (progress, dragX) => {
        // TODO: Error issue scale negative after show {transform: [{ scale: scale }]}
        const scale = dragX.interpolate({
            inputRange : [0, 100],
            outputRange : [0, 1]
        })

        return (
            <Animated.View style={[styles.rightActions]}>
                <TouchableOpacity style={[styles.actionBox, styles.editAction]} onPress={ () => editItem() }>
                    <Entypo name="edit" size={22} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBox, styles.deleteAction]} onPress={ () => removeItem() }>
                    <AntDesign name="delete" size={22} color="white" />
                </TouchableOpacity>
            </Animated.View>
        )
    }

    const removeItem = () => {
        console.log('remove')
    }

    const editItem = () => {
        console.log('edit')
    }

    return (
        <Swipeable renderRightActions={rightActions}>
            <View key={index} style={styles.itemList}>
                <Text style={{ color: 'black', fontSize: 18 }}>{item.name}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    content : {
        flex: 1,
        paddingTop: 25
    },
    itemList : {
        flex: 1, 
        backgroundColor: 'white', 
        paddingVertical: 20, 
        paddingHorizontal: 15,
        borderBottomWidth: 1
    },
    rightActions: {
        width: 100,
        flexDirection: 'row',
        backgroundColor: '#efefef',
    },
    actionBox : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editAction : {
        backgroundColor: 'green',
    },
    deleteAction : {
        backgroundColor: 'red',
    }
})

export default Content