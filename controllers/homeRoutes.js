const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    
    res.redirect('/profile');
    return;
  }
  console.log('Redirecting to /profile');
  res.render('login');
});
router.get('/homepage', async (req, res) => {
  try {
    // You can add logic specific to the /homepage route here if needed
    res.render('homepage', {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;