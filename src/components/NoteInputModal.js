import React, {useState, useEffect} from "react";
import Modal from "react-native-modal";

const NoteInputModal = ({ visible, toggleModal, modalRequestClose, onSubmit, note, isEdit }) => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   useEffect(()=>{
      if(isEdit){
         setTitle(note.title);
         setDescription(note.description);
      }
   }, [isEdit]);

   return(
      <Modal>

      </Modal>
   )
}

export default NoteInputModal;