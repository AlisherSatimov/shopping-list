import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { localTokenKey } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const ItemsList = () => {
  const { data: groups } = useFetch("/groups");

  const { groupId } = useParams();

  const { data: currentUser } = useFetch("/auth");

  function itemDates(date) {
    return `${date.slice(11, 16)},${date.slice(0, 10)}`;

    //2024-01-16T03:23:36.866Z
  }

  const [title, setTitle] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    if (!title)
      return toast("Title is required in order to create an element!", {
        type: "error",
      });

    try {
      await axios.post("/items", { title, groupId });
      toast("Item is created successfully!", { type: "success" });
    } catch (error) {
      toast(error.request, { type: "error" });
    }
  };

  const boughtItem = async (itemId) => {
    await axios.post(`/items/${itemId}/mark-as-bought`, {
      Authorization: `Bearer ${localTokenKey}`,
    });
    toast("Item is marked as bought successfully!", { type: "success" });
  };

  const unBoughtItem = async (itemId) => {
    await axios.delete(`/items/${itemId}/mark-as-bought`, {
      Authorization: `Bearer ${localTokenKey}`,
    });
    toast("Item is marked as not bought successfully!", { type: "success" });
  };

  const deleteItem = async (itemId) => {
    await axios.delete(`/items/${itemId}`, {
      Authorization: `Bearer ${localTokenKey}`,
    });
    toast("Item is deleted successfully!", {
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
                      Items{" "}
                      <span className="badge bg-primary">
                        {group.items.length}
                      </span>
                    </h4>
                    <form onSubmit={addItem}>
                      <div className="d-flex gap-1">
                        <input
                          value={title}
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <button className="btn btn-primary">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="h-100 overflow-auto">
                    <ul className="list-group">
                      {group.items.map((item) => {
                        if (item.group === groupId) {
                          return (
                            <li
                              key={item._id}
                              className="list-group-item text-capitalize d-flex justify-content-between align-items-center gap-3"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <span className="badge bg-primary fs-5">
                                  {item.title.slice(0, 1)}
                                </span>
                                <div>
                                  <span>{item.title + ` `}</span>
                                  <span className="bg-info rounded-2 text-white badge">
                                    {item.isBought
                                      ? `Bought By ` +
                                        item.boughtBy.name +
                                        " " +
                                        itemDates(item.boughtAt)
                                      : ""}
                                  </span>
                                  <br />
                                  <span className="text-secondary">
                                    Created by {item.owner.name} (
                                    {itemDates(item.createdAt)})
                                  </span>
                                </div>
                              </div>

                              <div className="d-flex gap-1">
                                <button
                                  className={
                                    item.isBought
                                      ? "btn btn-warning"
                                      : "btn btn-success"
                                  }
                                  onClick={
                                    item.isBought
                                      ? () => unBoughtItem(item._id)
                                      : () => boughtItem(item._id)
                                  }
                                >
                                  <i
                                    className={
                                      item.isBought
                                        ? "fa-solid fa-shop-slash"
                                        : "fa-solid fa-cart-plus"
                                    }
                                  ></i>
                                </button>
                                {item.owner._id === currentUser._id ? (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteItem(item._id)}
                                  >
                                    <i className="fa-solid fa-x"></i>
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
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

export default ItemsList;
