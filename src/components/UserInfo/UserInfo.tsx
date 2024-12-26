import React from 'react';
import './style.css';
import { Input } from 'antd';

interface UserInfoProps {
    dataUserEdit: any;
}

const UserInfo = (props: UserInfoProps) => {
    return (
        <div className="user-info">
            <div className="user-info__container">
                <div className="user-info__media">
                    <div className="user-info__avatar-wrapper">
                        <img
                            src={props.dataUserEdit.imageData ? "data:image/jpg;base64," + props.dataUserEdit.imageData : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdFyiWoLEr8VCqyp2Kz4y4Af70FpeHRl0aQ&s"}
                            alt="avatar"
                            className="user-info__avatar"
                        />
                        <img
                            src="./images/camera-icon.png"
                            alt=""
                            className="user-info__icon"
                        />
                    </div>
                    <p className="user-info__name">
                        {props.dataUserEdit.fullName}
                    </p>
                </div>
                <div className="user-info__content">
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Tên người dùng
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder={props.dataUserEdit.fullName}
                        />
                    </div>
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Tên đăng nhập{' '}
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder={props.dataUserEdit.email}
                        />
                    </div>
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Số điện thoại{' '}
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder={props.dataUserEdit.phoneNumber}
                        />
                    </div>
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Mật khẩu
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder="********"
                        />
                    </div>
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Email:
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder={props.dataUserEdit.email}
                        />
                    </div>
                    <div className="user-info__group">
                        <label htmlFor="" className="user-info__label">
                            Vai trò:
                        </label>
                        <Input
                            className="user-info__input"
                            disabled
                            placeholder={(props.dataUserEdit.note && props.dataUserEdit.note !== "undefined") ? "Bác sĩ" : "Admin"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
