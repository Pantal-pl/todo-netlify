const CreateUser = `mutation insert {
    insert_user(objects: {}) {
      returning {
        id
      }
    }
  }
  `;

export async function CreateNewUser(Client) {
  const { data, error } = await Client.mutation(CreateUser).toPromise();
  if (error) {
    console.log("Oh no: " + error);
  }
  console.log(data);
  return data["insert_user"].returning[0].id;
}
