import React from "react";
import {connect} from "react-redux";
import {
  follow,
  setCurrentPage,
  toggleIsFetching,
  setUsersTotalCount,
  setUsers,
  unfollow
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Prealoader/Preloader";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true)
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize)

      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
        this.props.setUsersTotalCount(data.totalCount)
      })

  }

  onPageChanged = (pageNum) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(pageNum)
    usersAPI.getUsers(pageNum, this.props.pageSize)
      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
      })
  }

  render() {
    return <>
      {this.props.isFetching ?
        <Preloader/>
        : null}

      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
      />

    </>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,

  }
}


export default connect(mapStateToProps,
  {
    follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, toggleIsFetching
  })(UsersContainer);