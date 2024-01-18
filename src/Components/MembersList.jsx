import { useParams } from "react-router-dom";
import { localTokenKey } from "../constants";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";

const MembersList = () => {
  const { data: groups, isLoading } = useFetch("/groups");

  const { groupId } = useParams();

  const { data: currentUser } = useFetch("/auth");

  const deleteMember = async (memberId) => {
    await axios.delete(`/groups/${groupId}/members/${memberId}`, {
      Authorization: `Bearer ${localTokenKey}`,
    });
    toast("Removed from group successfully!", {
      type: "success",
    });
  };

  return (
    <>
      {groups &&
        groups.map((group) => {
          if (group._id === groupId) {
            return (
              <div
                key={group._id}
                className="col-xl-6 h-100 overflow-hidden d-flex flex-column"
              >
                <div className="p-3 bg-white rounded-3 d-flex flex-column gap-1 h-100">
                  <div className="d-flex justify-content-between">
                    <h4>
                      Members{" "}
                      <span className="badge bg-primary">
                        {group.members.length}
                      </span>
                    </h4>
                  </div>
                  <div className="h-100 overflow-auto">
                    <ul className="list-group">
                      {group.members.map((member) => {
                        if (group._id === groupId) {
                          return (
                            <li
                              key={crypto.randomUUID()}
                              className="list-group-item text-capitalize d-flex justify-content-between align-items-center gap-3"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <span className="badge bg-primary fs-5">
                                  {member.name.slice(0, 1)}
                                </span>
                                <div>
                                  <span>{member.name}</span>
                                  <br />
                                </div>
                              </div>
                              {group.owner._id === currentUser._id &&
                              member._id !== currentUser._id ? (
                                <div
                                  className="d-flex gap-1"
                                  onClick={() => deleteMember(member._id)}
                                >
                                  <button className="btn btn-danger">
                                    <i className="fa-solid fa-x"></i>
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default MembersList;
