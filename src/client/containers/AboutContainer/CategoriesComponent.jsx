import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Tag, Input, message } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { updateProjectAction } from '@app/actions';
import { generateRandomColor } from '@app/utils';

const { Title } = Typography;

const CategoriesComponent = ({
  title,
  categoriesKeys,
  categories,
  projectId,
  updateProject,
  isUserOwner,
}) => {
  const dispatch = useDispatch();
  const [showTagInput, setShowTagInput] = useState(false);
  const tagInputRef = useRef(null);

  function onShowTagInput() {
    setShowTagInput(true);

    if (tagInputRef && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }

  /**
   * Category to be added.
   * @param {Object} value
   */
  function handleNewCategory(value) {
    if (value && value.length) {
      const color = generateRandomColor();
      const data = {
        colorName: color.name,
        name: value,
      };

      const categoriesData = categoriesKeys.map((item) => ({
        ...categories[item],
      }));

      if (
        categoriesData.find(
          (category) =>
            category.name.toLowerCase().trim() === value.toLowerCase().trim()
        )
      ) {
        message.warn(`${value} has already created!`);
        return;
      }

      dispatch(
        updateProjectAction(projectId, {
          categories: [...categoriesData, data],
        })
      );
    }

    setShowTagInput(false);
  }

  /**
   * ID of a category to be removed.
   * @param {String} id
   */
  function removeCategory(id) {
    const categoriesData = categoriesKeys
      .filter((categId) => categId !== id)
      .map((item) => ({
        ...categories[item],
      }));
    dispatch(updateProjectAction(projectId, { categories: categoriesData }));
  }

  return (
    <div className="p-4 bg-white rounded shadow my-2">
      <Title
        level={5}
        editable={
          isUserOwner
            ? {
                onChange: (value) =>
                  updateProject('settings.categories.name', value),
              }
            : false
        }
      >
        <span className="text-neutral-500  font-bold">{title}</span>
      </Title>
      <div className="py-4 border-t border-neutral-200">
        {categoriesKeys &&
          categoriesKeys.length > 0 &&
          categoriesKeys.map((key) => {
            const category = categories[key];

            return (
              <Tag
                closable={isUserOwner}
                key={key}
                color={category.colorName}
                onClose={() => removeCategory(category._id)}
              >
                {category.name.length > 12
                  ? `${category.name.slice(0, 12)}...`
                  : category.name}
              </Tag>
            );
          })}
      </div>

      {isUserOwner && (
        <div className="py-2">
          {showTagInput && (
            <Input
              ref={tagInputRef}
              size="small"
              onBlur={(evt) => handleNewCategory(evt.target.value)}
              onPressEnter={(evt) => handleNewCategory(evt.target.value)}
              style={{ width: 100 }}
            />
          )}
          {!showTagInput && (
            <Tag
              onClick={onShowTagInput}
              icon={<PlusCircleTwoTone />}
            >{`New ${title}`}</Tag>
          )}
        </div>
      )}
    </div>
  );
};

CategoriesComponent.defaultProps = {
  title: '',
  categoriesKeys: [],
  categories: {},
  projectId: undefined,
  isUserOwner: false,
};

CategoriesComponent.propTypes = {
  title: PropTypes.string,
  categoriesKeys: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  categories: PropTypes.objectOf(PropTypes.any),
  projectId: PropTypes.string,
  updateProject: PropTypes.func.isRequired,
  isUserOwner: PropTypes.bool,
};

export default CategoriesComponent;
