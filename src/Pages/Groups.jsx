import { useNavigate, useParams } from "react-router-dom";
import MembersList from "../Components/MembersList";
import Dropdown from "react-bootstrap/Dropdown";
import ItemsList from "../Components/ItemsList";
import { localTokenKey } from "../constants";
import useFetch from "./../Hooks/useFetch";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Groups = () => {
  const { data: groups, isLoading } = useFetch("/groups");
  const { groupId } = useParams();

  const { data: currentUser } = useFetch("/auth");

  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        groups && (
          <div className="container">
            {groups.map((group) => {
              if (group._id === groupId) {
                return (
                  <div key={group._id} className="p-3 memberItems">
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="text-light" to={`/main/groups`}>
                        {group.name}
                      </h1>
                      <div className="d-flex justify-content-between align-items-center gap-3">
                        <div className="bg-light p-2 rounded d-flex gap-3 ">
                          <span>Owner: </span>
                          <span className="text-capitalize d-flex align-items-center gap-1">
                            <span className="badge bg-primary">
                              {group.owner.name.slice(0, 1)}
                            </span>
                            <span>{group.owner.name}</span>(
                            <span className="text-secondary">
                              {group.owner.username}
                            </span>
                            )
                          </span>
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <i className="fa-solid fa-ellipsis"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <button
                                type="button"
                                className="btn btn-light w-100 text-start"
                              >
                                Add Member
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button
                                type="button"
                                className="btn btn-light w-100 text-start"
                                onClick={
                                  group.owner._id === currentUser._id
                                    ? async () => {
                                        try {
                                          await axios.delete(
                                            `/groups/${groupId}`,
                                            {
                                              Authorization: `Bearer ${localTokenKey}`,
                                            }
                                          );
                                          navigate(`/home`);
                                          toast("Group deleted successfully!", {
                                            type: "success",
                                          });
                                        } catch (error) {
                                          toast(error.request, {
                                            type: "error",
                                          });
                                          console.log(error);
                                        }
                                      }
                                    : async () => {
                                        try {
                                          await axios.post(
                                            `/groups/${groupId}/leave`,
                                            {
                                              Authorization: `Bearer ${localTokenKey}`,
                                            }
                                          );
                                          navigate(`/home`);
                                          toast(
                                            "Left from group successfully!",
                                            { type: "success" }
                                          );
                                        } catch (error) {
                                          toast(error.request, {
                                            type: "error",
                                          });
                                          console.log(error);
                                        }
                                      }
                                }
                              >
                                {group.owner._id == currentUser._id
                                  ? "Delete Group"
                                  : "Leave Group"}
                              </button>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="row  overflow-hidden">
                      <ItemsList />
                      <MembersList />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )
      )}
    </div>
  );
};

export default Groups;
