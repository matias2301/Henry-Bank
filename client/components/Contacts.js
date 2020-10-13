import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import {     
    TouchableOpacity,
    TouchableHighlight,
    View,
    Alert,
    Modal,
} from 'react-native';
import {  
    Text,
    Item,  
    Icon,
    Form,
    Input,
    Label,
    Content,
    Button,      
    Header,
    Left,
    Body,
    Right,
    Title,
  } from "native-base";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from "../Styles/contactsStyles";


export default Contacts = ({ navigation }) => {

    const [input, setInput] = useState({
        name:"",
        email:"",
      });
    const [error, setError] = useState({
        name:false,
        email:false
    });
    const [listData, setListData] = useState();
    const [modifyContact, setModifyContact] = useState(false);  
    const [modalVisible, setModalVisible] = useState(false);    
    

    useEffect(() => setListData(Array(1)
        .fill('')
        .map((_, i) => ({
            title: `Contacts`,
            data: [                
                    {name: 'Simon Mignolet', email: 'mignolet@gmail.com'},
                    {name: 'Nathaniel Clyne', email: 'clyne@gmail.com'},
                    {name: 'Dejan Lovren', email: 'lovren@gmail.com'},
                    {name: 'Mama Sakho', email: 'sakho@gmail.com'},
                    {name: 'Alberto Moreno', email: 'moreno@gmail.com'},
                    {name: 'Emre Can', email: 'can@gmail.com'},
                    {name: 'Joe Allen', email: 'allen@gmail.com'},
                    {name: 'Phil Coutinho', email: 'coutinho@gmail.com'},
                   ]                        
                    .map((i) => ({
                        key: `${i.email}`,
                        text: `${i.name}`,
                })),
    }))) , []);

    const closeRow = (rowMap, rowKey) => {
        setInput({
            ...input,
            email: rowKey,
          });     
        setModifyContact(true);        
        setModalVisible(true);
        console.log('rowKeymodify',rowKey);
        if (rowMap[rowKey]) {            
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {        
        
        console.log('rowKeydelete', rowKey);
        // closeRow(rowMap, rowKey);
        // const [section] = rowKey.split('.');
        // const newData = [...listData];
        // const prevIndex = listData[section].data.findIndex(
        //     item => item.key === rowKey
        // );
        // newData[section].data.splice(prevIndex, 1);
        // setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View style={{alignSelf:'flex-start', marginLeft:50}}>
                <Text>Contact: {data.item.text}</Text>
                <Text>Email: {data.item.key}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>...Hi</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    // const renderSectionHeader = ({ section }) => <Text>{section.title}</Text>;

    const handleChange = (name, value) => {
        setInput({
          ...input,
          [name]: value,
        });
    };

    const addContact = () =>{
        
        const regex_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if ( !input.name.trim() ) return setError({...error, name: true})            
        if ( !input.email.trim() || !regex_email.test(input.email) ) return setError({...error, email: true})
            setError({
                name: false,
                email: false,
            });
    
        if ( !error.name && !error.email ){      
          Alert.alert("Se agrego el nuevo contacto");
          setModifyContact(false);
          setModalVisible(!modalVisible);
          setInput({
              name:"",
              email:"",
          });
        }   
    }
    
    return (
        <View style={styles.container}>
        
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate("menuOp")}>
                    <Icon name='arrow-back' />
                    {/* <Text>Back</Text> */}
                    </Button>          
                </Left>
                <Body>
                    <Title>CONTACTS</Title>
                </Body>
                <Right>                    
                    <Button iconRight transparent onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={styles.textAddContact} >Add Contact</Text>
                    
                    <Icon
                        name='user-plus'
                        type= "FontAwesome5"   
                        // style={{color:"grey", fontSize:18}}                                         
                        // onPress={() => setShowconfirmPass(!showconfirmPass)}
                    />                    
                    </Button>
                </Right>
            </Header>

            <SwipeListView
                useSectionList
                sections={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                // renderSectionHeader={renderSectionHeader}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}                
            />

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Close modal first");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Text style={styles.modalText}>{!modifyContact ? 'Add New Contact' : 'Modify Contact Name'}</Text>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input
                                    name='name'
                                    value={input.name}
                                    onChangeText={(text) => handleChange("name", text)}
                                />
                            </Item>
                            { error.name && <Text style={styles.error}>Must fill this field</Text> }
                            
                            <Item floatingLabel last>
                                <Label>Email</Label>
                                <Input
                                    disabled={modifyContact}
                                    name='email'
                                    value={input.email}                                    
                                    onChangeText={(text) => handleChange("email", text)}
                                />
                            </Item>
                            { error.email && <Text style={styles.error}>Enter a valid Email</Text> }

                            <View style={styles.buttoms}>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={() => {
                                        setInput({
                                            name:"",
                                            email:"",
                                        });
                                        setError(false);
                                        setModifyContact(false);
                                        setModalVisible(!modalVisible);                                        
                                    }}
                                    >
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={addContact}
                                    >
                                    <Text style={styles.textStyle}>{!modifyContact ? 'ADD' : 'MODIFY'}</Text>
                                </TouchableHighlight>
                            </View>                           

                        </Form>
                    </Content>
                </View>
                </View>
            </Modal>           

        </View>
    );
}

// Se debe incluir las siguientes funcionalidades:

// Asociar Contacto: dar de alta un nuevo contacto cargando su nombre y mail: Validar que el nuevo contacto es cliente de Henry Bank por su mail.

// Modificar Contacto: poder cambiar el nombre solamente del contacto.

// Eliminar Contacto: dar de baja en contacto.
