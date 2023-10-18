import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 20px;
  border: 1px solid #3978ff;
  border-radius: 15px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #214799;
`;

const Photo = styled.img`
  width: 200px;
  height: 100px;
  border-radius: 15px;
  object-fit: contain;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #214799;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: #214799;
  color: white;
  opacity: 0.8;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  width: 20%;
`;

const EmptyPhoto = styled.img`
  width: 100px;
  height: 100px;
  border: 0px;
  opacity: 0;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;

  const onDelete = async () => {
    const ok = confirm("Are you sure want to delete this tweed?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
    // finally {
    // }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>delete</DeleteButton>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : (
        <EmptyPhoto />
      )}
    </Wrapper>
  );
}
