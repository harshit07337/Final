document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
      courseForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const courseCode = document.getElementById('courseCode').value;
        const courseName = document.getElementById('courseName').value;
      
        // Implement your course addition logic here
        console.log('Course Code:', courseCode);
        console.log('Course Name:', courseName);
        // Reset form fields
        document.getElementById('courseCode').value = '';
        document.getElementById('courseName').value = '';
      });
    }
  });
  