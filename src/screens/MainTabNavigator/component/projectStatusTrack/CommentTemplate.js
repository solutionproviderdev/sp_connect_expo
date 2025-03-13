import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAddCommentMutation, useUpdateProjectStatusMutation } from '../../../../redux/meeting/meetingApi';
// import { useAddCommentMutation, useUpdateProjectStatusMutation } from '../../../../redux/services/api';
 
interface CommentTemplateProps {
  leadId: string;
  status: string;
  subStatus: string;
  onSubmitted: () => void;
}

const CommentTemplate = ({
  leadId,
  status,
  subStatus,
  onSubmitted,
}: CommentTemplateProps) => {
  const [comment, setComment] = useState(
    `This step was changed to "${subStatus}" by the account holder on ${new Date().toLocaleDateString()}.`
  );

  const [updateProjectStatus] = useUpdateProjectStatusMutation();
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async () => {
    try {
      await updateProjectStatus({
        leadId,
        projectStatus: { status, subStatus },
      }).unwrap();

      await addComment({
        leadId,
        comment,
      }).unwrap();

      onSubmitted(); // Callback after submission
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Comment</Text>
      <TextInput
        style={styles.input}
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});

export default CommentTemplate;
