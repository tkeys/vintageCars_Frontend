import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../redux/slices/usersApiSlice";
import { UserType } from "../../misc/type";
import { toast } from "react-toastify";

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({});

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = (_id: any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(_id);
      toast.success("User deleted");
      refetch();
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error getting user list</Message>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Admin</th>
              <th>Banned</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.data.map((user: UserType) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>

                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    {user.role === "Admin" ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>{user.banned ? <FaTimes /> : <FaCheck />}</td>
                  <td>
                    <LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
