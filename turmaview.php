<?php
include 'Navturmas.php';

$user = user_info($_SESSION['id_user_meeting']);
?>
<div class="turma_view_tarefa">
  <?php
  $sql = "SELECT * FROM turmas WHERE turmas.id=" . $_GET['id_turma'] . ";";

  $query = $con->query($sql);
  $result = $query->fetch_object();
  $d=utf8_encode($result->id_explicador . "_" . $result->nome . "_" . $result->turma);
  ?>

  <div class='capa_turma'>
    <img src='../turmas/<?php echo $d. "/" . $result->img; ?>'>
    <div>
      <h3><?php echo $result->nome; ?></h3>
      <h4><?php echo $result->turma; ?></h4>
      <?php
      if ($user->user_explicador) { ?>
        <button type="button" class="b_c_turma" data-bs-toggle="modal" data-bs-target="#adicionar_tarefa">
          <img src="../icons/adicionar-ficheiro (1).png" style="width:36px; " alt="">
        </button>

      <?php
      }
      ?>
    </div>
  </div>
  <div class="tarefas_body">
    <div class="tarefas_turma">
      <?php

      $sql = "SELECT users.id AS 'id_user',turma_content.visible,type,turma_content.id AS 'id_tarefa', turma_content.nome AS 'tarefa_nome',id_turma,users.username FROM turma_content INNER JOIN turmas ON turmas.id=turma_content.id_turma INNER JOIN users ON users.id=turmas.id_explicador WHERE turma_content.id_turma=" . $_GET['id_turma'] . " AND turma_content.parent_id = 0 ORDER BY id_tarefa ASC ;";
      echo $sql;
      $query = $con->query($sql);
      if ($query->num_rows > 0) {
        while ($row = $query->fetch_object()) {
          if ($user->id == $row->id_user) {
            $drag_bool = true;
            $display = "inherit";
          } else {
            $drag_bool = false;
            $display = "none";
          }

          if ($row->type == 0) {

      ?>
            <a id="<?php echo $row->id_tarefa ?>" draggable="<?php echo $drag_bool; ?>" class="tarefa_link" href="tarefas?tarefa=<?php echo $row->id_tarefa; ?>">
              <div style="position:relative; left:0;">
                <img src="../icons/graduacao (1).png" style="width:46px;" alt="">
              </div>

              <span class="tarefa_nome_link"><?php echo $row->username . " publicou a seguinte tarefa:"; ?></span>
              <span style="position:relative; margin-left:10px;font-size:18px; font-weight:600; transform: translateY(20%); text-decoration:none;"><?php echo " " . $row->tarefa_nome; ?></span>

              <div style="position:absolute; display:<?php echo $display; ?>; right:10px; top:20px;">
                <img src="../icons/drag.png" style="width:20px;" alt="">
              </div>

            </a>

          <?php
          } else if ($row->type == 1) {

            if ($row->visible == 0) {
              $style = ' style="opacity:0.6; display:' . $display . '; " ';
            } else {
              $style = '';
            }
          ?>
            <div class="tarefas_body" <?php echo $style ?> id="tarefas_body_<?php echo $row->id_tarefa; ?>">

              <input type="text" class="edit_input" id="top_<?php echo $row->id_tarefa; ?>" style="position:relative; margin-left:5px;font-size:26px; font-weight:400; transform: translateY(0%); text-decoration:none;" value="<?php echo $row->tarefa_nome; ?>" disabled="true">
              <?php
              if ($drag_bool) { ?>
                <div class="d-flex edit_box" id="edit_box_<?php echo $row->id_tarefa; ?>">

                  <button class="" id="edit_btn_<?php echo $row->id_tarefa; ?>" onclick="edit_field('<?php echo $row->id_tarefa; ?>','top_<?php echo $row->id_tarefa; ?>',0)">
                    <img src="../icons/icons8-edit-48.png" style="width:25px;" alt="">
                  </button>

                  <button class="" id="confirm_btn_<?php echo $row->id_tarefa; ?>" onclick="edit_field('<?php echo $row->id_tarefa; ?>','top_<?php echo $row->id_tarefa; ?>',1)">
                    <img src="../icons/icons8-ok-48.png" style="width:30px;" alt="">

                  </button>

                  <button class="" id="delete_btn_<?php echo $row->id_tarefa; ?>" onclick="edit_field('<?php echo $row->id_tarefa; ?>','top_<?php echo $row->id_tarefa; ?>',2)">
                    <img src="../icons/icons8-close-64.png" style="width:30px;" alt="">

                  </button>

                  <button class="" onclick="edit_field('<?php echo $row->id_tarefa; ?>','top_<?php echo $row->id_tarefa; ?>',3,<?php echo $row->visible; ?>)">
                    <?php
                    if ($row->visible == 0) {
                    ?>
                      <img src="../icons/not-visible.png" style="width:30px;" alt="">

                    <?php
                    } else {
                    ?>
                      <img src="../icons/visibility.png" style="width:30px;" alt="">
                    <?php
                    }
                    ?>
                  </button>
                </div>
              <?php } ?>
              <hr>
              <div class="draggable_area" id="<?php echo $row->id_tarefa ?>">
                <?php
                $sql1 = "SELECT * FROM turma_content WHERE type=0 AND turma_content.parent_id = $row->id_tarefa ORDER BY ordem ASC;";
                $query1 = $con->query($sql1);
                if ($query1->num_rows > 0) {
                  while ($r = $query1->fetch_object()) {
                ?>
                    <a id="<?php echo $r->id ?>" draggable="<?php echo $drag_bool; ?>" class="tarefa_link" href="tarefas?tarefa=<?php echo $r->id ?>">
                      <div style="position:relative; left:0;">
                        <img src="../icons/graduacao (1).png" style="width:46px;" alt="">
                      </div>

                      <span class="tarefa_nome_link"><?php echo $row->username . " publicou a seguinte tarefa:"; ?></span>
                      <span style="position:relative; margin-left:10px;font-size:18px; font-weight:600; transform: translateY(20%); text-decoration:none;"><?php echo " " . utf8_decode($r->nome); ?></span>

                      <div style="position:absolute; display:<?php echo $display; ?>; right:10px; top:20px;">
                        <img src="../icons/drag.png" style="width:20px;" alt="">
                      </div>

                    </a>
                <?php
                  }
                }
                ?>

              <?php
            } else if ($row->type == 2) {
              echo "asf";
            }
              ?>
              </div>
            </div>
        <?php
        }
      } else {
        echo "Não tem tarefas adicionadas.";
      }
        ?>
    </div>
  </div>
  <!-- Acaba aqui a div turmas_view_tarefas-->