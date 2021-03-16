import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Tag, Input } from 'antd';
import { updateProjectAction } from '@app/actions';
import { generateRandomColor } from '@app/utils';

const { Title } = Typography;

const CategoriesComponent = ({
  title,
  categoriesKeys,
  categories,
  projectId,
  updateProject,
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
    <div className="py-6">
      <Title
        level={4}
        type="secondary"
        editable={{
          onChange: (value) => updateProject('settings.categories.name', value),
        }}
      >
        {title}
      </Title>

      {categoriesKeys &&
        categoriesKeys.length > 0 &&
        categoriesKeys.map((key) => {
          const category = categories[key];

          return (
            <Tag
              closable
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
        {!showTagInput && <Tag onClick={onShowTagInput}>{`New ${title}`}</Tag>}
      </div>
    </div>
  );
};

CategoriesComponent.propTypes = {
  title: PropTypes.string.isRequired,
  categoriesKeys: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
    .isRequired,
  categories: PropTypes.objectOf(PropTypes.any).isRequired,
  projectId: PropTypes.string.isRequired,
  updateProject: PropTypes.func.isRequired,
};

export default CategoriesComponent;
