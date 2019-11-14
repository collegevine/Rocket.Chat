import React, { useState } from 'react';
import { Random } from 'meteor/random';

import { useTranslation } from '../../providers/TranslationProvider';
import { Icon } from '../../basic/Icon';
import { Button } from '../../basic/Button';

export function AssetSettingInput({
	value,
	fileConstraints,
}) {
	const t = useTranslation();
	return value.url
		? <div className='settings-file-preview'>
			<div className='preview' style={{ backgroundImage: `url(${ value.url }?_dc=${ Random.id() })` }} />
			<div className='action'>
				<Button className='delete-asset'>
					<Icon icon='icon-trash' />{t('Delete')}
				</Button>
			</div>
		</div>
		: <div className='settings-file-preview'>
			<div className='preview no-file background-transparent-light secondary-font-color'><Icon icon='icon-upload' /></div>
			<div className='action'>
				<div className='rc-button rc-button--primary'>{t('Select_file')}
					<input type='file' accept={fileConstraints.extensions && fileConstraints.extensions.length && `.${ fileConstraints.extensions.join(', .') }`} />
				</div>
			</div>
		</div>;
}

export function RoomPickSettingInput({ _id }) {
	// const collection = usePrivateSettingsCollection();
	const [selectedRooms] = useState({});

	// useEffect(() => {
	// 	const withRoomPickType = (f) => (data) => {
	// 		if (data.type !== 'roomPick') {
	// 			return;
	// 		}

	// 		f(data);
	// 	};

	// 	collection.find().observe({
	// 		added: withRoomPickType((data) => {
	// 			setSelectedRooms({
	// 				...selectedRooms,
	// 				[data._id]: data.value,
	// 			});
	// 		}),
	// 		changed: withRoomPickType((data) => {
	// 			setSelectedRooms({
	// 				...selectedRooms,
	// 				[data._id]: data.value,
	// 			});
	// 		}),
	// 		removed: withRoomPickType((data) => {
	// 			setSelectedRooms(
	// 				Object.entries(selectedRooms)
	// 					.filter(([key]) => key !== data._id)
	// 					.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
	// 			);
	// 		}),
	// 	});
	// }, [collection]);

	return <div>
		{/* {{> inputAutocomplete settings=autocompleteRoom id=_id name=_id class="search autocomplete rc-input__element" autocomplete="off" disabled=isDisabled.disabled}} */}
		<ul class='selected-rooms'>
			{(selectedRooms[_id] || []).map(({ name }) =>
				<li key={name} className='remove-room' data-setting={_id}>
					{name} <Icon icon='icon-cancel' />
				</li>
			)}
		</ul>
	</div>;
}
